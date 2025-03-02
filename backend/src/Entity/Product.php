<?php

namespace App\Entity;

use ApiPlatform\Elasticsearch\Filter\TermFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Enum\CatalogDocumentTypeEnum;
use App\Repository\ProductRepository;
use App\State\ProductProvider;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\Ignore;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\BooleanFilter;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Post(),
        new Put(),
        new Patch(),
    ],
    normalizationContext: [
        'groups' => ['product:read'],
    ],
    denormalizationContext: [
        'groups' => ['product:write'],
    ],
    paginationClientItemsPerPage: true,
)]
#[ApiFilter(OrderFilter::class, properties: ['sku', 'title'], arguments: ['orderParameterName' => 'order'])]
#[ApiFilter(
    SearchFilter::class,
    properties: [
        'sku' => 'exact',
        'title' => 'partial',
    ]
)]
#[ApiFilter(BooleanFilter::class, properties: ['isPublished'])]

#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/catalog/{documentType}/{lvl1}/{lvl2}/{lvl3}',
            uriVariables: [
                'documentType' => new Link(fromClass: CatalogDocumentTypeEnum::class),
                'lvl1' => new Link(fromClass: Category::class),
                'lvl2' => new Link(fromClass: Category::class),
                'lvl3' => new Link(fromClass: Category::class),
            ],
            paginationClientItemsPerPage: true,
            normalizationContext: [
                'groups' => ['product:read'],
            ],
            denormalizationContext: [
                'groups' => ['product:write'],
            ],
            provider: ProductProvider::class,
        )
    ],
)]

class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['product:read','category:read','restoreCart:read'])]
    private ?int $id = null;

    #[Groups(['product:read','category:read','historyDetailed:read','history:read','restoreCart:read'])]
    #[ORM\Column(length: 255)]
    private ?string $sku = null;

    #[Groups(['product:read','category:read','product:write','historyDetailed:read','history:read','restoreCart:read'])]
    #[ORM\Column(length: 255)]
    private ?string $title = null;

    #[Groups(['product:read','category:read','product:write','restoreCart:read','history:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $defaultImagePath = null;

    #[Groups(['product:read','category:read','restoreCart:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $description = null;

    #[Groups(['product:read','category:read','restoreCart:read','history:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $barcode = null;

    #[Groups(['product:read','category:read','product:write','restoreCart:read'])]
    #[ORM\Column]
    private ?bool $isPublished = null;

    #[ORM\ManyToOne(targetEntity: Category::class, inversedBy: "productsLvl1")]
    private ?Category $categoryLvl1 = null;

    #[ORM\ManyToOne(targetEntity: Category::class, inversedBy: "productsLvl2")]
    private ?Category $categoryLvl2 = null;

    #[ORM\ManyToOne(targetEntity: Category::class, inversedBy: "productsLvl3")]
    private ?Category $categoryLvl3 = null;

    #[Groups(['product:read','category:read','productImages:read','restoreCart:read'])]
    #[ORM\OneToMany(mappedBy: 'product', targetEntity: ProductImages::class)]
    private Collection $imagePath;

    #[Ignore]
    #[ORM\OneToMany(mappedBy: 'sku', targetEntity: Migvan::class)]
    private Collection $migvans;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: PriceListDetailed::class)]
    private Collection $priceListDetaileds;


    #[Groups(['product:read','category:read','restoreCart:read'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[Groups(['product:read','category:read','restoreCart:read'])]
    #[ORM\Column]
    private ?\DateTimeImmutable $updatedAt = null;

    #[Groups(['product:read','category:read','restoreCart:read'])]
    #[ORM\Column(nullable: true)]
    private ?int $basePrice = null;

    #[Groups(['product:read','category:read','restoreCart:read'])]
    #[ORM\Column(nullable: true, options: ["comment" => "the price after online fetching"])]
    private ?float $finalPrice = 0;

    #[Groups(['product:read','category:read','restoreCart:read'])]
    #[ORM\Column]
    private ?int $stock = 0;

    #[Groups(['product:read','category:read','restoreCart:read'])]
    #[ORM\Column(nullable: true)]
    private ?int $packQuantity = null;

    #[Groups(['product:read','category:read','restoreCart:read'])]
    #[ORM\Column(nullable: true)]
    private ?int $discount = 0;

    #[Groups(['product:read','category:read','product:write'])]
    #[ORM\Column(nullable: true)]
    private ?int $orden = null;

    #[Groups(['product:read','category:read'])]
    #[ORM\OneToMany(mappedBy: 'product', targetEntity: ProductAttribute::class)]
    private Collection $productAttributes;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: ProductPack::class)]
    private Collection $packProducts;

    #[Groups(['product:read','category:read','product:write','historyDetailed:read','history:read','restoreCart:read'])]
    #[ORM\Column]
    private ?bool $isNew = null;

    #[Groups(['product:read','category:read','product:write','historyDetailed:read','history:read','restoreCart:read'])]
    #[ORM\Column]
    private ?bool $isSpecial = null;

    #[Groups(['product:read','category:read','product:write','restoreCart:read','history:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $length = null;

    #[Groups(['product:read','category:read','product:write','restoreCart:read','history:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $width = null;

    #[Groups(['product:read','category:read','product:write','restoreCart:read','history:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $height = null;

    #[Groups(['product:read','category:read','product:write','restoreCart:read','history:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $color = null;

    #[Groups(['product:read','category:read','product:write','restoreCart:read','history:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $volume = null;

    #[Groups(['product:read','category:read','product:write','restoreCart:read','history:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $diameter = null;

    #[Groups(['product:read','category:read','product:write','restoreCart:read','history:read'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $weight = null;

    #[ORM\Column(nullable: true, options: ["comment" => "Minimum price for agent only (calucaltion)"])]
    #[Groups(['product:read','category:read','restoreCart:read'])]
    private ?float $minimumPrice = null;

    public function __construct()
    {
        $this->imagePath = new ArrayCollection();
        $this->migvans = new ArrayCollection();
        $this->priceListDetaileds = new ArrayCollection();
        $this->productAttributes = new ArrayCollection();
        $this->packProducts = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSku(): ?string
    {
        return $this->sku;
    }

    public function setSku(string $sku): static
    {
        $this->sku = $sku;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getBarcode(): ?string
    {
        return $this->barcode;
    }

    public function setBarcode(?string $barcode): static
    {
        $this->barcode = $barcode;

        return $this;
    }

    public function isIsPublished(): ?bool
    {
        return $this->isPublished;
    }

    public function setIsPublished(bool $isPublished): static
    {
        $this->isPublished = $isPublished;

        return $this;
    }

    public function getCategoryLvl1(): ?category
    {
        return $this->categoryLvl1;
    }

    public function setCategoryLvl1(?category $categoryLvl1): static
    {
        $this->categoryLvl1 = $categoryLvl1;

        return $this;
    }

    public function getCategoryLvl2(): ?category
    {
        return $this->categoryLvl2;
    }

    public function setCategoryLvl2(?category $categoryLvl2): static
    {
        $this->categoryLvl2 = $categoryLvl2;

        return $this;
    }

    public function getCategoryLvl3(): ?category
    {
        return $this->categoryLvl3;
    }

    public function setCategoryLvl3(?category $categoryLvl3): static
    {
        $this->categoryLvl3 = $categoryLvl3;

        return $this;
    }

    /**
     * @return Collection<int, ProductImages>
     */
    public function getImagePath(): Collection
    {
        return $this->imagePath;
    }

    public function addImagePath(ProductImages $imagePath): static
    {
        if (!$this->imagePath->contains($imagePath)) {
            $this->imagePath->add($imagePath);
            $imagePath->setProductId($this);
        }

        return $this;
    }

    public function removeImagePath(ProductImages $imagePath): static
    {
        if ($this->imagePath->removeElement($imagePath)) {
            // set the owning side to null (unless already changed)
            if ($imagePath->getProductId() === $this) {
                $imagePath->setProductId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Migvan>
     */
    public function getMigvans(): Collection
    {
        return $this->migvans;
    }

    public function addMigvan(Migvan $migvan): static
    {
        if (!$this->migvans->contains($migvan)) {
            $this->migvans->add($migvan);
            $migvan->setSku($this);
        }

        return $this;
    }

    public function removeMigvan(Migvan $migvan): static
    {
        if ($this->migvans->removeElement($migvan)) {
            // set the owning side to null (unless already changed)
            if ($migvan->getSku() === $this) {
                $migvan->setSku(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, PriceListDetailed>
     */
    public function getPriceListDetaileds(): Collection
    {
        return $this->priceListDetaileds;
    }

    public function addPriceListDetailed(PriceListDetailed $priceListDetailed): static
    {
        if (!$this->priceListDetaileds->contains($priceListDetailed)) {
            $this->priceListDetaileds->add($priceListDetailed);
            $priceListDetailed->setProductId($this);
        }

        return $this;
    }

    public function removePriceListDetailed(PriceListDetailed $priceListDetailed): static
    {
        if ($this->priceListDetaileds->removeElement($priceListDetailed)) {
            // set the owning side to null (unless already changed)
            if ($priceListDetailed->getProductId() === $this) {
                $priceListDetailed->setProductId(null);
            }
        }

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getBasePrice(): ?int
    {
        return $this->basePrice;
    }

    public function setBasePrice(?int $basePrice): static
    {
        $this->basePrice = $basePrice;

        return $this;
    }

    public function getFinalPrice(): ?float
    {
        return $this->finalPrice;
    }

    public function setFinalPrice(?float $finalPrice): static
    {
        $this->finalPrice = $finalPrice;

        return $this;
    }

    public function getPackQuantity(): ?int
    {
        return $this->packQuantity;
    }

    public function setPackQuantity(?int $packQuantity): static
    {
        $this->packQuantity = $packQuantity;

        return $this;
    }

    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(?int $stock): static
    {
        $this->stock = $stock;

        return $this;
    }

    public function getDiscount(): ?int
    {
        return $this->discount;
    }

    public function setDiscount(?int $discount): static
    {
        $this->discount = $discount;

        return $this;
    }

    public function getDefaultImagePath(): ?string
    {
        return $this->defaultImagePath;
    }

    public function setDefaultImagePath(?string $defaultImagePath): static
    {
        $this->defaultImagePath = $defaultImagePath;

        return $this;
    }

    public function getOrden(): ?int
    {
        return $this->orden;
    }

    public function setOrden(int $orden): static
    {
        $this->orden = $orden;

        return $this;
    }

    /**
     * @return Collection<int, ProductAttribute>
     */
    public function getProductAttributes(): Collection
    {
        return $this->productAttributes;
    }

    public function addProductAttribute(ProductAttribute $productAttribute): static
    {
        if (!$this->productAttributes->contains($productAttribute)) {
            $this->productAttributes->add($productAttribute);
            $productAttribute->setProduct($this);
        }

        return $this;
    }

    public function removeProductAttribute(ProductAttribute $productAttribute): static
    {
        if ($this->productAttributes->removeElement($productAttribute)) {
            // set the owning side to null (unless already changed)
            if ($productAttribute->getProduct() === $this) {
                $productAttribute->setProduct(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, ProductPack>
     */
    public function getPackProducts(): Collection
    {
        return $this->packProducts;
    }

    public function addPackProduct(ProductPack $packProduct): static
    {
        if (!$this->packProducts->contains($packProduct)) {
            $this->packProducts->add($packProduct);
            $packProduct->setProduct($this);
        }

        return $this;
    }

    public function removePackProduct(ProductPack $packProduct): static
    {
        if ($this->packProducts->removeElement($packProduct)) {
            if ($packProduct->getProduct() === $this) {
                $packProduct->setProduct(null);
            }
        }

        return $this;
    }

    public function isIsNew(): ?bool
    {
        return $this->isNew;
    }

    public function setIsNew(bool $isNew): static
    {
        $this->isNew = $isNew;

        return $this;
    }

    public function isIsSpecial(): ?bool
    {
        return $this->isSpecial;
    }

    public function setIsSpecial(bool $isSpecial): static
    {
        $this->isSpecial = $isSpecial;

        return $this;
    }

    public function getLength(): ?string
    {
        return $this->length;
    }

    public function setLength(?string $length): static
    {
        $this->length = $length;

        return $this;
    }

    public function getWidth(): ?string
    {
        return $this->width;
    }

    public function setWidth(?string $width): static
    {
        $this->width = $width;

        return $this;
    }

    public function getHeight(): ?string
    {
        return $this->height;
    }

    public function setHeight(?string $height): static
    {
        $this->height = $height;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(?string $color): static
    {
        $this->color = $color;

        return $this;
    }

    public function getVolume(): ?string
    {
        return $this->volume;
    }

    public function setVolume(?string $volume): static
    {
        $this->volume = $volume;

        return $this;
    }

    public function getDiameter(): ?string
    {
        return $this->diameter;
    }

    public function setDiameter(?string $diameter): static
    {
        $this->diameter = $diameter;

        return $this;
    }

    public function getWeight(): ?string
    {
        return $this->weight;
    }

    public function setWeight(?string $weight): static
    {
        $this->weight = $weight;

        return $this;
    }

    public function getMinimumPrice(): ?float
    {
        return $this->minimumPrice;
    }

    public function setMinimumPrice(?float $minimumPrice): static
    {
        $this->minimumPrice = $minimumPrice;

        return $this;
    }

}