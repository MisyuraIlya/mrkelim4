// Global
import React, {
  FC,
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react'
import { useAuth } from '../store/auth.store'
import { useOneSignalStore } from '../store/oneSignal.store'

interface NotificationsContextType {
  // handleRemoveIosPromt: () => void
  // removeIosPromt: boolean
  // setRemoveIosPromt: (val: boolean) => void
}

const NotificationsContext = createContext<NotificationsContextType | null>(
  null
)

// React hook
const useNotifications = () => {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error('Can not run without "NotificationsProvider"')
  }

  return context
}

interface NotificationsProviderProps {
  children?: ReactNode
}

const NotificationsProvider: FC<NotificationsProviderProps> = ({
  children,
}) => {
  const { user } = useAuth()
  // const [removeIosPromt, setRemoveIosPromt] = useState<boolean>(
  //   localStorage.removeIosPromt ? false : true
  // )
  // const { registerClient, isUserRegistered } = useOneSignalStore()

  // const handleRemoveIosPromt = () => {
  //   localStorage.removeItem('removeIosPromt')
  // }

  // const handleBrowser = () => {
  //   setTimeout(() => {
  //     const appId = 'ff5e7738-0527-4d59-9382-13901391053a'
  //     const requestNotificationPermission = async () => {
  //       try {
  //         if (window?.OneSignal) {
  //           await window?.OneSignal?.registerForPushNotifications()
  //           const playerId = await window?.OneSignal?.getUserId()
  //           if (playerId) {
  //             localStorage.setItem('appId', playerId)
  //           }
  //         } else {
  //           // alert("OneSignal is not available.");
  //         }
  //       } catch (error) {
  //         // alert("Error requesting notification permission: "+ error);
  //       }
  //     }
  //     window?.OneSignal?.init({
  //       appId: appId,
  //     })

  //     requestNotificationPermission()

  //     return () => {
  //       window?.OneSignal?.clearEventHandlers()
  //     }
  //   }, 10000)
  // }

  // useEffect(() => {
  //   if (!isUserRegistered) {
  //     handleBrowser()
  //   }
  // }, [])

  // useEffect(() => {
  //   if (user?.extId) {
  //     const localAppId = localStorage.appId
  //     registerClient(user?.extId, localAppId, 'web')
  //   }
  // }, [user?.extId])

  const value = {
    // handleRemoveIosPromt,
    // removeIosPromt,
    // setRemoveIosPromt,
  }

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  )
}

export { useNotifications, NotificationsProvider }
