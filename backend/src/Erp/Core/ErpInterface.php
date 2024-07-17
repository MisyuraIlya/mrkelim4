<?php

namespace App\Erp\Core;

use App\Entity\History;
use App\Entity\User;
use App\Enum\DocumentsType;
use App\Erp\Core\Dto\CartessetDto;
use App\Erp\Core\Dto\CategoriesDto;
use App\Erp\Core\Dto\DocumentItemsDto;
use App\Erp\Core\Dto\DocumentsDto;
use App\Erp\Core\Dto\HovotDto;
use App\Erp\Core\Dto\MigvansDto;
use App\Erp\Core\Dto\PacksMainDto;
use App\Erp\Core\Dto\PacksProductDto;
use App\Erp\Core\Dto\PriceListsDetailedDto;
use App\Erp\Core\Dto\PriceListsDto;
use App\Erp\Core\Dto\PriceListsUserDto;
use App\Erp\Core\Dto\PricesDto;
use App\Erp\Core\Dto\ProductsDto;
use App\Erp\Core\Dto\PurchaseHistory;
use App\Erp\Core\Dto\StocksDto;
use App\Erp\Core\Dto\UsersDto;
use App\Repository\HistoryDetailedRepository;
use App\Repository\HistoryRepository;
use phpDocumentor\Reflection\Types\Boolean;

interface ErpInterface
{
    /** CORE */
    public function GetRequest(?string $query);
    public function PatchRequest(object $object, string $table);
    public function PostRequest(\stdClass $object, string $table);
    /** ONLINE */
    public function SendOrder(History $history);
    public function GetDocuments(?User $user, \DateTimeImmutable $dateFrom, \DateTimeImmutable $dateTo, DocumentsType $documentsType): DocumentsDto;
    public function GetDocumentsItem(string $documentNumber, DocumentsType $documentType): DocumentItemsDto;
    public function GetCartesset(string $userExId, \DateTimeImmutable $dateFrom, \DateTimeImmutable $dateTo): CartessetDto;

    public function GetHovot(string $userExId, \DateTimeImmutable $dateFrom, \DateTimeImmutable $dateTo): HovotDto;
    public function PurchaseHistoryByUserAndSku(string $userExtId, string $sku): PurchaseHistory;

    /** FOR CRON */
    public function GetCategories(): CategoriesDto;
    public function GetProducts(?int $pageSize, ?int $skip): ProductsDto;
    public function GetSubProducts(): ProductsDto;
    public function GetUsers(): UsersDto;
    public function GetUsersInfo(): UsersDto;
    public function GetSubUsers(): UsersDto;
    public function GetMigvan(): MigvansDto;
    public function GetPriceList(): PriceListsDto;
    public function GetPriceListUser(): PriceListsUserDto;
    public function GetPriceListDetailed(): PriceListsDetailedDto;
    public function GetStocks(): StocksDto;
    public function GetPackMain(): PacksMainDto;
    public function GetPackProducts(): PacksProductDto;

}