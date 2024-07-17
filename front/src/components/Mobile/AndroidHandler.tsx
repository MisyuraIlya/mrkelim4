import React from 'react'
import { useMobile } from '../../provider/MobileProvider'
import PwaHandler from './PwaHandler'

const AndroidHandler = () => {
  const { detectBrowser } = useMobile()
  return (
    <>
      {detectBrowser() !== 'Chrome' && (
        <PwaHandler
          title={'אנחנו תומכים רק בדפדפן CHROME'}
          link={
            'https://play.google.com/store/apps/details?id=com.android.chrome'
          }
          needPlatrofm={'Chrome'}
        />
      )}
    </>
  )
}

export default AndroidHandler
