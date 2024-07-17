<?php

namespace App\Service;

use ApiPlatform\Doctrine\Orm\Paginator;
use App\Erp\Core\ErpManager;

class StockChecker
{
    public function __construct(
        private readonly ErpManager $erpManager
    )
    {
        $this->isOnlinePrice = $_ENV['IS_WITH_STOCK'] === "true";
    }
    public function GetStockOnline(Paginator $paginator)
    {
        if( $this->isOnlinePrice){

        } else {

        }
    }
}