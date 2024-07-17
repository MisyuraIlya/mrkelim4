<?php

namespace App\Controller;

use App\Entity\History;
use App\Entity\HistoryDetailed;
use App\Entity\Notification;
use App\Entity\NotificationUser;
use App\Entity\User;
use App\Enum\DocumentsType;
use App\Enum\PurchaseStatus;
use App\Erp\Core\ErpManager;
use App\helpers\ApiResponse;
use App\Repository\HistoryDetailedRepository;
use App\Repository\HistoryRepository;
use App\Repository\NotificationRepository;
use App\Repository\NotificationUserRepository;
use App\Repository\ProductRepository;
use App\Repository\UserRepository;
use App\Service\OneSignal;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SendOrderController extends AbstractController
{

    public function __construct(
        private HistoryRepository $historyRepository,
        private HistoryDetailedRepository $historyDetailedRepository,
        private UserRepository $userRepository,
        private ProductRepository $productRepository,
        private readonly ErpManager $erpManager,
        private readonly OneSignal $oneSignal,
        private readonly NotificationRepository $notificationRepository,
        private readonly NotificationUserRepository $notificationUserRepository,
    )
    {
        $this->tax = 17;
    }

    #[Route('/sendOrder', name: 'send_order', methods: ['POST'])]
    public function index(Request $request): Response
    {
        try {
            $data = json_decode($request->getContent(), true);
            $cart = $data['cart'];
            $comment = $data['comment'];
            $user = $data['user'];
            $discountUser = $data['discountUser'];
            $deliveryPrice = $data['deliveryPrice'];
            $agent = $data['agent'];
            $type = $data['documentType'];
            $isSendToErp = $data['isSendToErp'];

            $findUser = $this->userRepository->findOneByExIdAndPhone($user['extId'], $user['phone']);
            if(!$findUser) throw new \Exception('לא נמצא לקוח כזה');
            if($findUser->getIsBlocked()) throw new \Exception('לקוח חסום אנא פנה לתמיכה');
            if(!$type === null) throw new \Exception('documentType שדה חובה order|quote|return');
            if(count($cart) == 0) throw new \Exception('לא נבחר שום מוצר');
            if($agent){
                $findAgent = $this->userRepository->findOneById($agent['id']);
            } else {
                $findAgent = null;
            }

            $history = $this->HandleHistory(
                $cart,
                $findUser,
                $comment,
                $type,
                $deliveryPrice,
                $discountUser,
                $request->getContent(),
                $findAgent
            );
            $this->HandleHistoryDetailed($history, $cart);

            $orderNumber = null;
            if($isSendToErp){
//            $orderNumber = $this->erpManager->SendOrder($history);
            }
            if($orderNumber && $isSendToErp){
                $history->setOrderExtId($orderNumber);
                $history->setOrderStatus(PurchaseStatus::PAID);
                $this->historyRepository->save($history,true);
                $userName = $findUser->getExtId() . ' ' . $findUser->getName();

                try {
                    $this->oneSignal
                        ->SendOrderPush($findUser, 'התקבלה הזמנה במערכת', "מספר הזמנה: $orderNumber")
                        ->AlertToAgentsGetOrder('בוצעה הזמנה במערכת',"לקורח $userName ביצעה הזמנה $orderNumber");
                    $this->CreateNotification($findUser, $orderNumber);
                } catch (\Exception $exception){
                }

                $obj = new \stdClass();
                $obj->historyId = $history->getId();
                $obj->orderNumber = $orderNumber;
                return  $this->json((new ApiResponse($obj,''))->OnSuccess());
            } else if(!$isSendToErp) {
                $obj = new \stdClass();
                $obj->historyId = $history->getId();
                $obj->orderNumber = null;
                return  $this->json((new ApiResponse($obj,''))->OnSuccess());
            } else {
                throw new \Exception('הזמנה לא שודרה: לא התקבל מספר הזמנה');
            }

        } catch (\Exception $e) {
                $data = json_decode($request->getContent(), true);
                $type = $data['documentType'];
                $comment = $data['comment'];
                $user = $data['user'];
                $findUser = $this->userRepository->findOneByExIdAndPhone($user['extId'], $user['phone']);
                $history = new History();
                $history->setCreatedAt(new \DateTimeImmutable());
                $history->setUpdatedAt(new \DateTimeImmutable());
                $history->setError($e->getMessage());
                $history->setJson($request->getContent());
                $history->setIsSendErp(false);
                $history->setOrderStatus(PurchaseStatus::FAILED);
                $history->setDocumentType($this->getDocumentTypeEnum($type));
                $history->setIsBuyByCreditCard(false);
                $history->setOrderComment($comment);
                $history->setUser($findUser);
                $this->historyRepository->save($history, true);
            return $this->json((new ApiResponse(null,$e->getMessage()))->OnError());
        }
    }

    private function HandleHistory(
        array $cart,
        User $user,
        string $comment,
        $type ,
        int $deliveryPrice,
        int $discountUser,
        string $json,
        ?User $agent)
    {

        $newHistory = new History();
        $newHistory->setUser($user);
        $newHistory->setCreatedAt(new \DateTimeImmutable());
        $newHistory->setUpdatedAt(new \DateTimeImmutable());
        $newHistory->setDiscount($discountUser);
        $newHistory->setDeliveryDate(null);
        $newHistory->setOrderComment($comment);
        $newHistory->setDeliveryPrice($deliveryPrice);
        $newHistory->setTotal($this->CalculateTotal($cart,$deliveryPrice));
        $newHistory->setOrderStatus(PurchaseStatus::PENDING);
        $newHistory->setDocumentType($this->getDocumentTypeEnum($type));
        $newHistory->setJson($json);
        if($agent){
            $newHistory->setAgent($agent);
            $newHistory->setIsSendErp($agent->isIsAllowOrder());
        } else {
            $newHistory->setIsSendErp(true);
        }
        $newHistory->setIsBuyByCreditCard(false);
        $historyId = $this->historyRepository->save($newHistory, true);
        return $historyId;
    }

    private function HandleHistoryDetailed(History $history, array $cart)
    {
        foreach ($cart as $itemRec){
            $findProduct = $this->productRepository->findOneBySku($itemRec['sku']);
            if(!$findProduct) throw new \Error('לא נמצא פריט כזה');
            if(!$findProduct->isIsPublished()) throw new \Error( 'פריט חסום' . ' ' .  $findProduct->getTitle());
            $obj = new HistoryDetailed();
            $obj->setProduct($findProduct);
            $obj->setHistory($history);
            $obj->setQuantity($itemRec['quantity']);
            $obj->setTotal($itemRec['total']);
            $obj->setSinglePrice($itemRec['price']);
            $obj->setDiscount($itemRec['discount']);
            $this->historyDetailedRepository->createHistoryDetailed($obj,true);
        }
    }

    private function CalculateTotal($cart,$deliveryPrice): float
    {
        $total = 0;
        foreach($cart as $item){
            $total += $item['total'];
        }
        $taxPrice = ( $this->tax / 100 ) * $total;
        $final = $total + $taxPrice + $deliveryPrice;
        $formatted_number = (float) number_format($final, 2);
        return $formatted_number;

    }

    private function getDocumentTypeEnum(string $type): DocumentsType
    {
        return match ($type) {
            'all' => DocumentsType::ALL,
            'order' => DocumentsType::ORDERS,
            'priceOffer' => DocumentsType::PRICE_OFFER,
            'deliveryOrder' => DocumentsType::DELIVERY_ORDER,
            'aiInvoice' => DocumentsType::AI_INVOICE,
            'ciInvoice' => DocumentsType::CI_INVOICE,
            'returnOrder' => DocumentsType::RETURN_ORDERS,
            'history' => DocumentsType::HISTORY,
            'draft' => DocumentsType::DRAFT,
            default => throw new \InvalidArgumentException("Invalid document type: $type")
        };
    }

    private function CreateNotification(User $user, $orderNumber)
    {
        $description = "התקבלה הזמנה מספר" . ' ' .  "$orderNumber";
        $title = "התקבלה הזמנה";
        $createNot = new Notification();
        $createNot->setCreatedAt(new \DateTimeImmutable());
        $createNot->setTitle($title);
        $createNot->setDescription($description);
        $createNot->setIsSend(true);
        $createNot->setIsPublic(false);
        $createNot->setIsPublished(true);
        $createNot->setIsSystem(true);
        $this->notificationRepository->save($createNot,true);

        $userNot = new NotificationUser();
        $userNot->setUser($user);
        $userNot->setNotification($createNot);
        $userNot->setIsRead(false);
        $userNot->setCreatedAt(new \DateTimeImmutable());
        $this->notificationUserRepository->save($userNot,true);

    }


}
