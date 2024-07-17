// ============= Documents =============
type OrderStatus = 'paid' | 'draft' | 'pending' | 'faild'

type IDocumentTypes =
  | 'history'
  | 'draft'
  | 'approve'
  | 'order'
  | 'priceOffer'
  | 'deliveryOrder'
  | 'aiInvoice'
  | 'ciInvoice'
  | 'returnOrder'
  | 'kartesset'

interface IDocument {
  id: number
  documentNumber: string
  documentType: IDocumentTypes
  userName: string
  userExId: string
  agentExId: string
  agentName: string
  status: string
  createdAt: string
  updatedAt: string
  total: number
  error: string
}

// ============= Documents =============

// ============= Documents Items =============

interface IDocumentItems {
  products: {
    'hydra:totalItems': number
    'hydra:member': IDocumentItem[]
  }
  totalTax: number
  totalPriceAfterTax: number
  totalAfterDiscount: number
  totalPrecent: number
  documentType: string
  files: {
    'hydra:totalItems': number
    'hydra:member': IDocumentItemsFile[]
  }
}

interface IDocumentItem {
  '@type': string
  '@id': string
  sku: string
  title: string
  quantity: number
  priceByOne: number
  total: number
  discount: number
  product: IProduct
}

interface IDocumentItemsFile {
  name: string
  base64: string
}

// ============= Documents Items =============

interface DocumentsResponse extends Hydra {
  'hydra:member': IDocument[]
}

interface ICartesset {
  createdAt: string
  tnua: string
  asmahta1: string
  dateEreh: string
  description: string
  hova: string
  zhut: string
  yetra: string
}

interface CartessetResponse extends Hydra {
  lines: {
    'hydra:member': ICartesset[]
  }
}

interface IHovot {
  createdAt: string
  documentNumber: string
  debit: string
  lineSum: string
  payDate: string
}

interface HovotResponse extends Hydra {
  lines: {
    'hydra:member': IHovot[]
  }
  total: number
}
