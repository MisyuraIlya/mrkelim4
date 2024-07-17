import axios from 'axios'

const CartServices = {
  async CreateOrder(
    cart: ICart[],
    comment: string,
    user: IUser,
    documentType: IDocumentType,
    deliveryPrice: number,
    discountUser?: number,
    agent?: IUser | null,
    isSendToErp?: boolean
  ): Promise<SendOrderResponse> {
    const obj = {
      cart,
      comment,
      user,
      documentType,
      deliveryPrice,
      agent,
      discountUser,
      isSendToErp,
    }
    const response = await axios.post(
      `${process.env.REACT_APP_API}/sendOrder`,
      obj
    )
    return response.data
  },
  async CheckCart(user: IUser, cart: ICart[]): Promise<CartCheckResponse> {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/cartCheck`,
      { user, cart }
    )
    return response.data
  },
}

export default CartServices
