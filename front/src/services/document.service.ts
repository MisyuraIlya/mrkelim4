import axios from 'axios'
import moment from 'moment'

interface RestoreCartResponse extends Hydra {
  'hydra:member': ICart[]
}

export const DocumentsService = {
  async GetDocuments(
    user: IUser,
    documentType: string,
    fromDate: Date,
    toDate: Date,
    page: string | number
  ): Promise<DocumentsResponse> {
    const fromConverted = moment(fromDate).format('YYYY-MM-DD')
    const toDateConverted = moment(toDate).format('YYYY-MM-DD')

    let url = `${process.env.REACT_APP_API}/api/documents/${documentType}/${fromConverted}/${toDateConverted}?page=${page}`
    console.log('user', user)
    if (
      user.role === 'ROLE_USER' ||
      user.role === 'ROLE_AGENT' ||
      user.role === null
    ) {
      url += `&userId=${user.id}`
    }
    const response = await axios.get(url)
    return response.data
  },

  async GetDocumentsItem(
    documentItemType: IDocumentTypes,
    documentNumber: number | string,
    user?: IUser
  ): Promise<IDocumentItems> {
    let apiUrl = `${process.env.REACT_APP_API}/api/documentItems/${documentItemType}/${documentNumber}`
    if (user) {
      apiUrl += `?userExId=${user.id}`
    }
    const response = await axios.get(apiUrl)
    return response.data
  },

  async RestoreCart(
    documentType: string,
    userId: number,
    documentNumber: string
  ): Promise<ICart[] | null> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/restoreCart/${documentType}/${userId}/${documentNumber}`
    )
    if (response.data) {
      return response.data['hydra:member']
    } else {
      return null
    }
  },

  async ApproveOrder(orderId: number, agentId: number) {
    const response = await axios.post(`${process.env.REACT_APP_API}/approve`, {
      agentId,
      orderId,
    })
    return response.data
  },

  async GetCartesset(
    user: IUser,
    fromDate: Date,
    toDate: Date
  ): Promise<CartessetResponse> {
    const fromConverted = moment(fromDate).format('YYYY-MM-DD')
    const toDateConverted = moment(toDate).format('YYYY-MM-DD')
    let apiUrl = `${process.env.REACT_APP_API}/api/cartesset/${fromConverted}/${toDateConverted}/${user?.extId}`
    const response = await axios.get(apiUrl)
    return response.data
  },

  async GetHovot(
    user: IUser,
    fromDate: Date,
    toDate: Date
  ): Promise<HovotResponse> {
    const fromConverted = moment(fromDate).format('YYYY-MM-DD')
    const toDateConverted = moment(toDate).format('YYYY-MM-DD')
    let apiUrl = `${process.env.REACT_APP_API}/api/Hovot/${fromConverted}/${toDateConverted}/${user?.extId}`
    const response = await axios.get(apiUrl)
    return response.data
  },
}
