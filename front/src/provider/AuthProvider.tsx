import React, {
  FC,
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react'
import { useAuth } from '../store/auth.store'
import { useNavigate } from 'react-router-dom'

interface ModalContextType {
  isAuthrized: number | boolean
}
const ModalContext = createContext<ModalContextType | null>(null)

const useAuthProvider = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('Can not run without "Auth Context Provider"')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}
const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const isAuthrized = (settings?.isOpenWorld || user?.id) ?? false
  const isAuthenticated = !!user

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  const value = {
    isAuthrized,
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export { useAuthProvider, AuthProvider }
