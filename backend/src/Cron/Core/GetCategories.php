<?php

namespace App\Cron\Core;

use App\Entity\Category;
use App\Enum\CategoryEnum;
use App\Erp\Core\Dto\ProductDto;
use App\Erp\Core\ErpManager;
use App\Repository\CategoryRepository;

class GetCategories
{
    public function __construct(
        private readonly CategoryRepository $categoryRepository,
        private readonly ErpManager $erpManager,
    )
    {
    }

    private function HandleLvl1($extId,$title): Category
    {
        $category = $this->categoryRepository->findOneByExtId($extId);
        if(empty($category)){
            $category = new Category();
            $category->setExtId($extId);
            $category->setLvlNumber(1);
            $category->setIsPublished(true);
        }
        $category->setTitle($title);
        $this->categoryRepository->createCategory($category,true);
        return $category;
    }

    private function HandleWithParent($extId,$title,Category $parent,int $lvlNumber)
    {
        $category = $this->categoryRepository->findOneByExtIdAndParentId($extId, $parent->getId());
        if(empty($category)){
            $category = new Category();
            $category->setExtId($extId);
            $category->setParent($parent);
            $category->setLvlNumber($lvlNumber);
            $category->setIsPublished(true);
        }
        $category->setTitle($title);
        $this->categoryRepository->createCategory($category,true);
        return $category;
    }


    public function sync()
    {
        $skip = 0;
        $pageSize = 30;
        do {
            $response = $this->erpManager->GetProducts($pageSize, $skip);
            if (!empty($response->products)) {
                foreach ($response->products as $key => $itemRec) {
                    assert($itemRec instanceof  ProductDto);
                    if($itemRec->categoryLvl1Name && $itemRec->categoryLvl2Name && $itemRec->categoryLvl3Name){
                        $lvl1 = $this->HandleLvl1($itemRec->categoryLvl1Id,$itemRec->categoryLvl1Name);
                        $lvl2 = $this->HandleWithParent($itemRec->categoryLvl2Id, $itemRec->categoryLvl2Name,$lvl1,2);
                        $this->HandleWithParent($itemRec->categoryLvl3Id, $itemRec->categoryLvl3Name,$lvl2,3);
                    }
                }
                $skip += $pageSize;
            } else {
                break;
            }
        } while (true);
    }

}