import React, {
  FC,
  createContext,
  useState,
  useContext,
  ReactNode,
} from 'react'

import Mobile from '../components/Mobile'
import { useMediaQuery } from '@mui/material'

interface ModalContextType {
  isMobile: boolean
  isIPhone: boolean
  isAndroid: boolean
  isPwa: boolean
  detectBrowser: () => IBrowser
}
const ModalContext = createContext<ModalContextType | null>(null)

const useMobile = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('Can not run without "ModalContext Provider"')
  }
  return context
}

interface MobileProviderProps {
  children: ReactNode
}
const MobileProvider: FC<MobileProviderProps> = ({ children }) => {
  const isIPhone = /iPhone/i.test(navigator.userAgent)
  const isAndroid = /Android/i.test(navigator.userAgent)
  const isPwa = window.matchMedia('(display-mode: standalone)').matches
  const isMobile = useMediaQuery('(max-width:800px)')

  const detectBrowser = (): IBrowser => {
    const nav = navigator.userAgent
    if (nav.indexOf('Chrome') > -1) {
      return 'Chrome'
    } else if (nav.indexOf('Firefox') > -1) {
      return 'Firefox'
    } else if (nav.indexOf('Safari') > -1) {
      return 'Safari'
    } else if (nav.indexOf('Edge') > -1) {
      return 'Edge'
    } else if (nav.indexOf('Opera') > -1) {
      return 'Opera'
    } else if (nav.indexOf('Trident') > -1) {
      return 'Trident'
    } else {
      return 'Unknown'
    }
  }

  const value = {
    isMobile,
    isIPhone,
    isAndroid,
    isPwa,
    detectBrowser,
  }

  return (
    <ModalContext.Provider value={value}>
      {isIPhone && <Mobile.IosHandler />}
      {isAndroid && <Mobile.AndroidHandler />}
      {children}
    </ModalContext.Provider>
  )
}

export { useMobile, MobileProvider }
