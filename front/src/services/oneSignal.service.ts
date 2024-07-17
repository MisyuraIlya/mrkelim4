import axios from 'axios'
export const OneSignalService = {
  async registerAppId(user: IUser, appId: string) {
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/api/users/${user.id}`,
      { oneSignalAppId: appId },
      {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      }
    )
    return response.data
  },
}
