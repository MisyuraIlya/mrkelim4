import React, {
  FC,
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react'
import { OneSignalService } from '../services/oneSignal.service'
import { useAuth } from '../store/auth.store'

interface OneSignalContextType {}
const OneSignalContext = createContext<OneSignalContextType | null>(null)

const useOneSignal = () => {
  const context = useContext(OneSignalContext)
  if (!context) {
    throw new Error('Can not run without "OneSignal Provider"')
  }
  return context
}

interface OneSignalProviderProps {
  children: ReactNode
}
const OneSignalProvider: FC<OneSignalProviderProps> = ({ children }) => {
  const [alreadyRegistered, setAlreadyRegistered] = useState(false)
  const { user } = useAuth()
  const [appId, setAppId] = useState('')

  const handleBrowser = () => {
    try {
    } catch (e) {}
    setTimeout(() => {
      try {
        const appId = settings.oneSignalKey
        const requestNotificationPermission = async () => {
          try {
            if (window.OneSignal) {
              await window.OneSignal.registerForPushNotifications()
              const playerId = await window.OneSignal.getUserId()
              if (playerId) {
                setAppId(playerId)
                localStorage.setItem('appId', playerId)
                console.log('playerId', playerId)
                if (user && playerId) {
                  OneSignalService.registerAppId(user, playerId)
                }
              }
            } else {
              // alert("OneSignal is not available.");
            }
          } catch (error) {
            // alert("Error requesting notification permission: "+ error);
          }
        }
        window.OneSignal!.init({
          appId: appId,
        })
        requestNotificationPermission()
        return () => {
          window.OneSignal!.clearEventHandlers()
        }
      } catch (e) {
        console.log('[error]', e)
      }
    }, 10000)
  }

  useEffect(() => {
    if (!alreadyRegistered) {
      handleBrowser()
    }
  }, [])

  const value = {}

  return (
    <OneSignalContext.Provider value={value}>
      {children}
    </OneSignalContext.Provider>
  )
}

export { useOneSignal, OneSignalProvider }
