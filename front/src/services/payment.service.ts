import axios from 'axios'

interface GetNotificationUserResponse extends Hydra {
  'hydra:member': INotificationUser[]
}

export const PaymentService = {
  async generateYadUrl(orderId: number, userId: number, total: number) {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/payment/generateIframe`,
      {
        orderId,
        userId,
        total,
      }
    )
    return response.data
  },
}
