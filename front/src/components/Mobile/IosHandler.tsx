import React from 'react'
// import { useNotifications } from '../../provider/PushNotification'
import { useMobile } from '../../provider/MobileProvider'
// import { useOneSignalStore } from '../../../../store/oneSignalStore'
import PwaHandler from './PwaHandler'
import { useOneSignalStore } from '../../store/oneSignal.store'

const IosHandler = () => {
  const { isPwa, detectBrowser } = useMobile()
  //   const { handleRemoveIosPromt, removeIosPromt } = useNotifications()
  const iconFirst = 'https://shanishenhav.online/app/img/shareSafariIcon.png'

  function isUsingChromeOniPhone() {
    const userAgent = window.navigator.userAgent
    return /CriOS/i.test(userAgent)
  }

  return (
    <>
      {detectBrowser() === 'Safari' && !isUsingChromeOniPhone() ? (
        <>
          {!isPwa && (
            <>
              {/* {removeIosPromt ? (
                <div
                  className="IosHandler"
                  onClick={() => handleRemoveIosPromt()}
                >
                  <div className="content">
                    <span style={{ textAlign: 'center' }}>
                      להורדה של אפליקציה לאייפון שלך: לחץ{' '}
                      <img src={iconFirst} alt="icon" width={20} /> לאחר הוסף
                      לדף הבית{' '}
                    </span>
                  </div>
                  <div className="centered">
                    <div className="triangle-down"></div>
                  </div>
                </div>
              ) : null} */}
            </>
          )}
        </>
      ) : (
        <PwaHandler
          title={'אנחנו תומכים רק בדפדפן SAFARI'}
          link={''}
          needPlatrofm={'Safari'}
        />
      )}
    </>
  )
}

export default IosHandler
