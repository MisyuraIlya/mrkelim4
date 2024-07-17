import axios from 'axios'

interface NotificationsServicesResponse {
  status: 'sucsses' | 'error'
  message: string
  data: boolean
}

interface GetNotificationResponse extends Hydra {
  'hydra:member': INotification[]
}

export const AdminNotificationsServices = {
  async createItem(object: INotification): Promise<INotification> {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/api/notifications`,
      object
    )
    return response.data
  },

  async updateItem(object: INotification): Promise<INotification> {
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/api/notifications/${object.id}`,
      object,
      {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      }
    )
    return response.data
  },

  async deleteItem(id: number | string): Promise<void> {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/api/notifications/${id}`
    )
    return response.data
  },

  async fetchNotifications(): Promise<GetNotificationResponse> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/notifications?isSystem=false`
    )
    console.log('response', response)
    return response.data
  },

  async sendNotification(data: ISendNotification) {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/sendNotification`,
      data
    )
    return response.data
  },
}
