import axios from 'axios'

interface orderResponse extends Hydra {
  'hydra:member': IHistory[]
}

interface orderItemsResponse extends Hydra {
  'hydra:member': IHistoryDetailed[]
}

export const AdminOrderService = {
  async getOrders(
    dateFrom: string,
    dateTo: string,
    page: string | number,
    search: string
  ): Promise<orderResponse> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/histories?page=${page}&createdAt[after]=${dateFrom}&createdAt[before]=${dateTo}&user.extId=${search}`
    )
    return response.data
  },

  async getOrderItem(orderItem: string | number): Promise<orderItemsResponse> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/history_detaileds?history.id=${orderItem}`
    )
    return response.data
  },

  async createHistory(history: IHistory): Promise<IHistory> {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/api/histories`,
      history
    )
    return response.data
  },
  async createHistoryDetailed(
    historyDetailed: IHistoryDetailed
  ): Promise<IHistoryDetailed> {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/api/history_detaileds`,
      historyDetailed
    )
    return response.data
  },
}
