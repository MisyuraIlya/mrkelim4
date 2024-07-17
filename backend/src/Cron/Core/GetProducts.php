<?php

namespace App\Cron\Core;

use App\Entity\Product;
use App\Erp\Core\ErpManager;
use App\Repository\CategoryRepository;
use App\Repository\ProductRepository;

class GetProducts
{
    public function __construct(
        private readonly CategoryRepository $categoryRepository,
        private readonly ProductRepository $productRepository,
        private readonly ErpManager $erpManager,
    )
    {
    }

    public function sync()
    {
        $skip = 0;
        $pageSize = 30;
        do {
            $res = $this->erpManager->GetProducts($pageSize, $skip);
            if (!empty($res->products)) {
                foreach ($res->products as $key => $itemRec) {
                    if($itemRec->sku && $itemRec->categoryLvl1Id && $itemRec->categoryLvl2Id && $itemRec->categoryLvl3Id){
                        try {
                            $product = $this->productRepository->findOneBySku($itemRec->sku);
                            if (!$product) {
                                $product = new Product();
                                $product->setSku($itemRec->sku);
                                $product->setCreatedAt(new \DateTimeImmutable());
                            }
                            $findCategorylvl1 = $this->categoryRepository->findOneByExtIdAndLvlNumber($itemRec->categoryLvl1Id,1);
                            if(!empty($findCategorylvl1)){
                                $product->setCategoryLvl1($findCategorylvl1);
                                $findCategorylvl2 = $this->categoryRepository->findOneByExtIdAndParentId($itemRec->categoryLvl2Id,$findCategorylvl1->getId());
                                if(!empty($findCategorylvl2)){
                                    $product->setCategoryLvl2($findCategorylvl2);
                                    $findCategorylvl3 = $this->categoryRepository->findOneByExtIdAndParentId($itemRec->categoryLvl3Id,$findCategorylvl2->getId());
                                    if(!empty($findCategorylvl3)){
                                        $product->setCategoryLvl3($findCategorylvl3);
                                    }
                                }
                            }

                            $product->setOrden($key);
                            $product->setTitle($itemRec->title);
                            $product->setPackQuantity($itemRec->packQuantity);
                            $product->setBasePrice($itemRec->baseprice);
                            $product->setMinimumPrice($itemRec->minimumPrice);
                            $product->setUpdatedAt(new \DateTimeImmutable());
                            $product->setIsPublished($itemRec->status);
                            $product->setIsNew(false);
                            $product->setIsSpecial(false);
                            $product->setLength($itemRec->Extra2);
                            $product->setWidth($itemRec->Extra3);
                            $product->setHeight($itemRec->Extra4);
                            $product->setColor($itemRec->Extra5);
                            $product->setVolume($itemRec->Extra6);
                            $product->setDiameter($itemRec->Extra7);
                            $product->setWeight($itemRec->Extra8);
                            $this->productRepository->createProduct($product, true);
                        } catch (\Exception $e) {
                            dd($itemRec);
                        }
                    }
                }
                $skip += $pageSize;
            } else {
                break;
            }
        } while (true);
    }

}