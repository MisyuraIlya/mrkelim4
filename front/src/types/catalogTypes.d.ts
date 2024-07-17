interface IProduct {
  '@id': string
  id: number
  sku: string
  title: string
  defaultImagePath: string
  description: string
  barcode: string
  isPublished: boolean
  imagePath: IImagePath[]
  createdAt: string
  updatedAt: string
  basePrice: float
  finalPrice: float
  minimumPrice: float
  stock: number
  packQuantity: number
  discount: number
  ordern: number
  productAttributes: ISubAttributes[]
  packProducts: packProducts[]
  link: string
  linkTitle: string
  isNew: boolean
  isSpecial: boolean
  length: string
  width: string
  height: string
  color: string
  volume: string
  diameter: string
  weight: string
}

interface packProducts {
  id: number
  pack: IPack
}

interface IPack {
  id: number
  extId: string
  name: string
  quantity: number
}

interface IImagePath {
  id: number
  mediaObject: IMediaObject
}

type typeMode = 'list' | 'grid'

interface ICategory {
  id: number
  extId: string
  title: string
  description: string
  isPublished: boolean
  orden: number
  lvlNumber: number
  parent: ?ICategory
  categories: ?ICategory[]
  MediaObject: IMediaObject
  identify: string
  isBlockedForView: boolean
}

interface IAttributeMain {
  id: number
  extId: string
  title: string
  isPublished: boolean
  ordern: number
  isInProductCard: boolean
  isInFilter: boolean
  SubAttributes: ISubAttributes[]
}

interface ISubAttributes {
  id: number
  title: string
}

interface PurchaseHistoryItem {
  documentNumber: string
  date: string
  quantity: number
  price: number
  vatPrice: number
  discount: number
  totalPrice: number
  vatTotal: number
}

interface ProductPopUp {
  documents: ProductDocument[]
}

interface ProductDocument {
  EXTFILEDES: string
  CURDATE: string
  EXTFILENAME: string
  ELEL_SITEDISPLAY: string
  SUFFIX: string
}

type CatalogDocumentType = 'catalog' | 'search' | 'special' | 'new'

interface GetCatalogResponse extends Hydra {
  'hydra:member': IProduct[] // Define a more specific type if possible
}

interface GetCategoriesResponse extends Hydra {
  'hydra:member': ICategory[]
}

interface GetPurchaseHistoryItem extends Hydra {
  'hydra:member': PurchaseHistoryItem[]
}
