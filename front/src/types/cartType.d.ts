interface ICart {
  discount: number
  price: float
  product: IProduct
  quantity: number
  sku: string
  stock: number
  total: float
  choosedPackQuantity: number
}

type IDocumentType = 'order' | 'quote' | 'return' | 'draft'

interface IDocumentMode {
  value: IDocumentType
  label: string
  isOnlyAgent: boolean
}

type IPriceMode = 'selfPrice' | 'updatedPrice'

interface ICartCheck {
  maam: float
}

interface CartCheckResponse extends ApiResponse {
  data: ICartCheck
}

interface SendOrderResponse extends ApiResponse {
  data: {
    historyId: number
    orderNumber: string | null
  }
}
