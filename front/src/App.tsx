import { BrowserRouter } from 'react-router-dom'
import RouterApp from './RouterApp'
import { ModalsProvider } from './provider/ModalProvider'
import { NotificationsProvider } from './provider/PushNotification'
import { CacheProvider } from '@emotion/react'
import { prefixer } from 'stylis'
import rtlPlugin from 'stylis-plugin-rtl'
import createCache from '@emotion/cache'
import { ThemeProvider } from '@mui/material'
import theme from './styles/mui'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { MobileProvider } from './provider/MobileProvider'
import { OneSignalProvider } from './provider/OneSignalProvider'
import { AuthProvider } from './provider/AuthProvider'

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
})

function App() {
  return (
    <BrowserRouter>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="he">
            <AuthProvider>
              <OneSignalProvider>
                <MobileProvider>
                  <ModalsProvider>
                    <NotificationsProvider>
                      <RouterApp />
                    </NotificationsProvider>
                  </ModalsProvider>
                </MobileProvider>
              </OneSignalProvider>
            </AuthProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </CacheProvider>
    </BrowserRouter>
  )
}

export default App
