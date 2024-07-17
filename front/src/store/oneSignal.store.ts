import moment from 'moment'
import { create } from 'zustand'
import { NotificationsServices } from '../services/admin/AdminNotifications.service'
import { BROWSER_TPYES } from '../enums/browserTypes'

interface OneSignalStoreState {
  loading: boolean
  oneSignalNotifications: IOneSignalServerNotification[]
  oneSignalNotificationsLength: number
  apiClientName: string
  isOpenModalNotification: boolean
  isUserRegistered: boolean

  setIsOpenModalNotification: (value: boolean) => void
  getOneSignalNotifications: (userExtId: string) => void
  registerClient: (userExtId: string, appId: string, platform: string) => void
  handleIsRead: (id: number | string, value: boolean) => void
}

export const useOneSignalStore = create<OneSignalStoreState>((set, get) => ({
  loading: false,
  oneSignalNotifications: [],
  oneSignalNotificationsLength: 0,
  apiClientName: 'bfl',
  isOpenModalNotification: false,
  isUserRegistered: false,
  setIsOpenModalNotification: (bool: boolean) =>
    set({ isOpenModalNotification: bool }),

  getOneSignalNotifications: async (userExtId: string) => {
    try {
      const response = await NotificationsServices.getOrdersPerClient(
        get().apiClientName,
        userExtId
      )
      if (response?.status === 'sucsses') {
        set({
          oneSignalNotifications: response.data,
          oneSignalNotificationsLength: response.data.length,
        })
      }
    } catch (e) {
      console.log('errorMe', e)
    }
  },

  registerClient: async (
    userExtId: string,
    appId: string,
    platform: string
  ) => {
    if (userExtId) {
      try {
        const response = await NotificationsServices.registerClient(
          get().apiClientName,
          appId,
          platform,
          true,
          userExtId,
          true,
          '1'
        )
        if (response.message == 'User ex id with this App id exists') {
          set({ isUserRegistered: true })
        }
      } catch (e) {
        console.log('error register client', e)
      }
    }
  },

  handleIsRead: (id: number | string, value: boolean) => {},
}))
