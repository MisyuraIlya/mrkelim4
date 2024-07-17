<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\ApiResource\Dto\CartsDto;
use App\ApiResource\RestoreCart;
use App\Entity\User;
use App\Enum\DocumentsType;
use App\Erp\Core\ErpManager;
use App\Repository\HistoryRepository;
use App\Repository\ProductRepository;
use App\Repository\UserRepository;
use App\Service\MigvanChecker;
use App\Service\PriceChecker;
use App\Service\StockChecker;

class RestoreCartStateProvider implements ProviderInterface
{
    public function __construct(
        private readonly HistoryRepository $historyRepository,
        private readonly UserRepository $userRepository,
        private readonly ProductRepository $productRepository,
        private readonly ErpManager $erpManager,
        private readonly PriceChecker $priceChecker,
        private readonly StockChecker $stockChecker,
        private readonly MigvanChecker $migvanChecker,
    )
    {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {

        $documentType = $uriVariables['documentType'];
        $orderNumber = $uriVariables['orderNumber'];
        $userId = $uriVariables['userId'];
        $user = $this->userRepository->findOneById($userId);
        if($documentType === 'history' && !empty($user)) {
            $response = $this->handleHistory($orderNumber,$user);
            return $response->cart;
        }
        if(!empty($user)) {
            $response = $this->handleOnline($orderNumber,$user,$documentType);
            return $response->cart;
        }
        return [];
    }

    private function handleOnline($orderNumber, User $user, $documentType): CartsDto
    {
        $docType = $this->getDocumentTypeEnum($documentType);
        $result = new CartsDto();
        $data = $this->erpManager->GetDocumentsItem($orderNumber,$docType);
        foreach ($data->products as $itemRec){
            $product = $this->productRepository->findOneBySku($itemRec->sku);
            if($product && $product->isIsPublished()){
                $obj = new RestoreCart();
                $obj->total = $product->getBasePrice() * $itemRec->quantity;
                $obj->sku = $product->getSku();
                $obj->discount = 0;
                $obj->stock = 99999;
                $obj->price = $product->getBasePrice();
                $obj->quantity = $itemRec->quantity;
                $product->setFinalPrice($product->getBasePrice());
                $obj->product = $product;
                $result->cart[] = $obj;
            }
        }


        return $result;
    }

    private function handleHistory($orderNumber, User $user): CartsDto
    {
        $result = new CartsDto();
        $data = $this->historyRepository->findOneById($orderNumber);
        $migvan = $this->migvanChecker->GetMigvanOnline($user);

        foreach ($data->getHistoryDetaileds() as $itemRec){
            $product = $this->productRepository->findOneBySku($itemRec->getProduct()->getSku());
            if(!empty($migvan)){
                if($product && $product->isIsPublished() && in_array($product->getSku(), $migvan)){
                    $obj = new RestoreCart();
                    $obj->total = $product->getBasePrice() * $itemRec->getQuantity();
                    $obj->sku = $product->getSku();
                    $obj->discount = 0;
                    $obj->stock = 0;
                    $obj->price = $product->getBasePrice();
                    $obj->quantity = $itemRec->getQuantity();
                    $product->setFinalPrice($product->getBasePrice());
                    $obj->product = $product;
                    $result->cart[] = $obj;
                }
            } else {
                if($product && $product->isIsPublished()){
                    $obj = new RestoreCart();
                    $obj->total = $product->getBasePrice() * $itemRec->getQuantity();
                    $obj->sku = $product->getSku();
                    $obj->discount = 0;
                    $obj->stock = 0;
                    $obj->price = $product->getBasePrice();
                    $obj->quantity = $itemRec->getQuantity();
                    $product->setFinalPrice($product->getBasePrice());
                    $obj->product = $product;
                    $result->cart[] = $obj;
                }
            }
        }
        $this->priceChecker->GetOnlinePriceFromCart($user,$result);


        return $result ;

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


}
