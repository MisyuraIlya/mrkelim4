<?php

namespace App\State;

use ApiPlatform\Doctrine\Orm\Paginator;
use ApiPlatform\Doctrine\Orm\State\CollectionProvider;
use ApiPlatform\Doctrine\Orm\State\ItemProvider;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\Pagination\TraversablePaginator;
use ApiPlatform\State\ProviderInterface;
use App\Entity\Product;
use App\Entity\User;
use App\Enum\CatalogDocumentTypeEnum;
use App\Erp\Core\ErpManager;
use App\Repository\PriceListUserRepository;
use App\Repository\ProductRepository;
use App\Repository\UserRepository;
use App\Service\MigvanChecker;
use App\Service\PriceChecker;
use App\Service\StockChecker;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\RequestStack;

class ProductProvider implements ProviderInterface
{

    private array $skus = [];
    public function __construct(
        private readonly RequestStack $requestStack,
        #[Autowire(service: CollectionProvider::class)] private ProviderInterface $collectionProvider,
        #[Autowire(service: ItemProvider::class)] private ProviderInterface $itemProvider,
        private readonly PriceListUserRepository $priceListUserRepository,
        private readonly UserRepository $userRepository,
        private readonly ProductRepository $productRepository,
        private readonly ErpManager $erpManager,
        private readonly PriceChecker $priceChecker,
        private readonly StockChecker $stockChecker,
        private readonly MigvanChecker $migvanChecker
    )
    {

    }


    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $userId =  $this->requestStack->getCurrentRequest()->get('userId');
        $mode =  $this->requestStack->getCurrentRequest()->get('mode','order');
        $userEntity = $this->userRepository->findParentUser($userId);
        $migvan = $this->migvanChecker->GetMigvanOnline($userEntity);
        $data = $this->GetDbData($migvan,$mode);
        $this->priceChecker->GetOnlinePirce($userEntity,$data);
        $this->stockChecker->GetStockOnline($data);
        return new TraversablePaginator(
            new \ArrayIterator($data->getIterator()),
            $data->getCurrentPage(),
            $data->getItemsPerPage(),
            $data->getTotalItems()
        );

    }

    private function GetDbData(array $migvan, string $mode)
    {
        $documentType = (string) $this->requestStack->getCurrentRequest()->attributes->get('documentType');
        $lvl1 =  $this->requestStack->getCurrentRequest()->attributes->get('lvl1');
        $lvl2 =  $this->requestStack->getCurrentRequest()->attributes->get('lvl2');
        $lvl3 =  $this->requestStack->getCurrentRequest()->attributes->get('lvl3');
        $orderBy =  $this->requestStack->getCurrentRequest()->get('orderBy');
        $userExtId =  $this->requestStack->getCurrentRequest()->get('userExtId');
        $page = (int)  $this->requestStack->getCurrentRequest()->get('page', 1);
        $itemsPerPage = (int)  $this->requestStack->getCurrentRequest()->get('itemsPerPage',24);
        $attributes =  $this->requestStack->getCurrentRequest()->get('attributes');
        $searchValue = $this->requestStack->getCurrentRequest()->get('search');
        $isShowAll = $this->requestStack->getCurrentRequest()->get('showAll',false) == 'true' ;

        $makatsForSearch = [];

        if($documentType == CatalogDocumentTypeEnum::SPECIAL->value){
            $makatsForSearch = $this->HandleSpecial($userExtId);
        }

        if($documentType ==  CatalogDocumentTypeEnum::NEW->value) {
            $makatsForSearch = $this->HandleNewProducts($userExtId);
        }

        if(!empty($migvan) && $mode == 'order'){
            $makatsForSearch = array_merge($makatsForSearch,$migvan);
        }

        $data = $this->productRepository->getCatalog(
            $page,
            $itemsPerPage,
            (int) $lvl1,
            (int) $lvl2,
            (int) $lvl3,
            $isShowAll,
            $orderBy,
            $attributes,
            $searchValue,
            $makatsForSearch,
        );
        return $data;
    }

    private function HandleSpecial($userExtId): array
    {
        $mataks = [];
        $res = $this->productRepository->getSpecialProducts();
        foreach ($res as $itemRec){
            $mataks[] = $itemRec->getSku();
        }
        return $mataks;
    }

    private function HandleNewProducts($userExtId): array
    {
        $mataks = [];
        $res =  $this->productRepository->getNewProducts();
        foreach ($res as $itemRec){
            $mataks[] = $itemRec->getSku();
        }
        return $mataks;
    }

}
