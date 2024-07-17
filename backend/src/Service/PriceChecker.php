<?php

namespace App\Service;

use ApiPlatform\Doctrine\Orm\Paginator;
use App\ApiResource\Dto\CartsDto;
use App\Entity\HistoryDetailed;
use App\Entity\Product;
use App\Entity\User;
use App\Erp\Core\Dto\PriceDto;
use App\Erp\Core\Dto\PricesDto;
use App\Erp\Core\ErpManager;

class PriceChecker
{
    public function __construct(
        private readonly ErpManager $erpManager
    )
    {
    }

    private function GetPricesBySkus(array $skus, $userExtId): array
    {
        $implodedSkus = $this->ImplodeQueryByMakats($skus);
        $endpoint2 = "/CUSTOMERS";
        $queryParameters2 = [
            '$filter' => "CUSTNAME eq '$userExtId'",
            '$select' => 'CUSTNAME',
            '$expand' => 'CUSTPARTPRICE_SUBFORM($select=PRICE,PARTNAME;$filter='.$implodedSkus. ')',
        ];
        $queryString2 = http_build_query($queryParameters2);
        $urlQuery2 = $endpoint2 . '?' . $queryString2;
        return  $this->erpManager->GetRequest($urlQuery2);

    }
    public function GetOnlinePirce(?User $user, Paginator $paginator)
    {
        if($user){
            $userExtId = $user->getExtId();
            $skus = [];
            foreach ($paginator->getIterator() as $item) {
                $skus[] = $item->getSku();
            }
            if(!empty($skus)){
                $response = $this->GetPricesBySkus($skus, $userExtId);
                foreach ($response as $item) {
                    foreach ($item['CUSTPARTPRICE_SUBFORM'] as $price) {
                        foreach ($paginator->getIterator() as &$product) {
                            assert($product instanceof Product);
                            if($product->getSku() == $price['PARTNAME']){
                                $product->setFinalPrice($price['PRICE']);
                            }
                        }
                    }
                }
            }

        }

    }

    public function GetOnlinePriceFromCart(?User $user, CartsDto $cartsDto)
    {
        $skus = [];
        foreach ($cartsDto->cart as $itmeRec){
            $skus[] = $itmeRec->sku;
        }

        $response = $this->GetPricesBySkus($skus, $user->getExtId());
        foreach ($cartsDto->cart as &$itemRec){
            foreach ($response as $priceRec){
                foreach ($priceRec['CUSTPARTPRICE_SUBFORM'] as $price) {
                    if($itemRec->sku === $price['PARTNAME']){
                        $itemRec->product->setFinalPrice($price['PRICE']);
                        $itemRec->price= $itemRec->quantity * $price['PRICE'];
                        $itemRec->total = $itemRec->price;
                    }
                }
            }
        }
    }

    private function ImplodeQueryByMakats(array $makats)
    {
        $filterParts = [];
        foreach ($makats as $sku) {
            $filterParts[] = "PARTNAME eq '$sku'";
        }

        $filterString = implode(' or ', $filterParts);
        return $filterString;
    }

    private function ImplodeQueryByPlname(array $priceList)
    {
        $filterParts = [];
        foreach ($priceList as $pricePlname) {
            $filterParts[] = "PLNAME eq '$pricePlname'";
        }

        $filterString = implode(' or ', $filterParts);
        return $filterString;
    }
}