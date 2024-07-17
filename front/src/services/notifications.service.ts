import axios from 'axios'

interface GetNotificationUserResponse extends Hydra {
  'hydra:member': INotificationUser[]
}

export const notifications = {
  async getNotificationByUserId(
    userId: string | number
  ): Promise<GetNotificationUserResponse> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/notification_users?user.id=${userId}&isRead=false`
    )
    return response.data
  },

  async updateNotification(obj: {
    id: number
    isRead: boolean
  }): Promise<{ id: number; isRead: boolean }> {
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/api/notification_users/${obj.id}`,
      obj,
      {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      }
    )
    return response.data
  },
}
