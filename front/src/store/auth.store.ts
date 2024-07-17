import { create } from 'zustand'
import { AuthService } from '../services/auth.service'
import {
  getRefreshToken,
  removeFromStorage,
  saveToStorage,
  updateAccessToken,
} from '../helpers/auth.helper'
import { onErrorAlert, onSuccessAlert } from '../utils/MySweetAlert'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'

interface AuthState {
  loading: boolean
  isAdmin: boolean
  isAgent: boolean
  isSuperAgent: boolean
  user: IUser | null
  setUser: (user: IUser | null) => void

  agent: IUser | null
  setAgent: (user: IUser | null) => void
  // ========== STATES FOR AUTH MODAL ==========
  action: ActionType
  setAction: (value: ActionType) => void
  userExtId: string
  phone: string
  email: string
  setEmail: (value: string) => void
  setUserExtId: (value: string) => void
  setPhone: (value: string) => void
  // ========== STATES FOR AUTH MODAL ==========

  //==========  METHODS ==========
  login: (username: string, password: string) => void
  registration: (
    userExId: string,
    username: string,
    password: string,
    phone: string,
    token: string
  ) => void
  validation: (userExId: string, phone: string) => void
  getAccessToken: () => void
  restorePasswordStepOne: (email: string) => void
  restorePasswordStepTwo: (
    email: string,
    token: string,
    password: string
  ) => void
  logOut: () => void
  registerClient: (data: formNewB2bForm) => void
  //==========  METHODS ==========
  // userDocs: UserDocs[]
  // getUserDocs: () => void
}

type ActionType =
  | 'login'
  | 'register'
  | 'validation'
  | 'forgotPassordStepOne'
  | 'forgotPassordStepTwo'
  | 'registerNewClient'

export const useAuth = create(
  persist(
    (set, get) => ({
      loading: false,
      isAdmin: false,
      isAgent: false,
      isSuperAgent: false,
      user: null,
      setUser: (user) => set({ user }),

      agent: null,
      setAgent: (agent) => set({ agent }),
      // ========== STATES FOR AUTH MODAL ==========
      action: 'login',
      setAction: (value: ActionType) => set({ action: value }),
      userExtId: '',
      setUserExtId: (value) => set({ userExtId: value }),
      phone: '',
      setPhone: (value: string) => set({ phone: value }),
      email: '',
      setEmail: (value: string) => set({ email: value }),
      // ========== STATES FOR AUTH MODAL ==========

      //==========  METHODS ==========

      login: async (username: string, password: string) => {
        try {
          set({ loading: true })
          const response = await AuthService.login(username, password)
          if (response.status === 'success') {
            saveToStorage(response)
            set({ user: response.user })
            if (
              response.user.role === 'ROLE_AGENT' ||
              response.user.role === 'ROLE_SUPER_AGENT'
            ) {
              set({ isAgent: true, agent: response.user })
              if (response.user.role === 'ROLE_SUPER_AGENT') {
                set({ isSuperAgent: true })
              }
            } else if (response.user.role === 'ROLE_ADMIN') {
              set({ isAdmin: true, agent: response.user })
            }
            onSuccessAlert('ברוכים הבאים', '')
            setTimeout(() => {
              location.reload()
            }, 1500)
          } else {
            onErrorAlert('שגיאה', '')
          }
        } catch (e) {
          console.error('[ERROR AUTH SERIVEC]', e)
        } finally {
          set({ loading: false })
        }
      },

      registration: async (
        userExtId: string,
        username: string,
        password: string,
        phone: string,
        token: string
      ) => {
        try {
          set({ loading: true })
          const response = await AuthService.registration(
            userExtId,
            username,
            password,
            phone,
            token
          )
          if (response.status === 'success') {
            get().login(username, password)
          } else {
            onErrorAlert('שגיאה', response.message)
          }
        } catch (e) {
          console.error('[ERROR AUTH SERIVEC]', e)
        } finally {
          set({ loading: false })
        }
      },

      validation: async (userExId: string, phone: string) => {
        try {
          set({ loading: true })
          const response = await AuthService.validation(userExId, phone)
          if (response.status === 'success') {
            get().setUserExtId(response.data.exId)
            get().setPhone(phone)
            get().setAction('register')
          } else {
            onErrorAlert('שגיאה', response.message)
            return false
          }
        } catch (e) {
          console.error('[ERROR AUTH SERIVEC]', e)
        } finally {
          set({ loading: false })
        }
      },

      getAccessToken: async () => {
        try {
          set({ loading: true })
          const refreshToken = getRefreshToken()
          if (refreshToken) {
            const response = await AuthService.getAccessToken(refreshToken)
            if (response.status === 'success') {
              updateAccessToken(response)
            } else {
              get().logOut()
            }
          }
        } catch (e) {
          console.error('[ERROR AUTH SERIVEC]', e)
        } finally {
          set({ loading: false })
        }
      },

      restorePasswordStepOne: async (email: string) => {
        try {
          set({ loading: true })
          const response = await AuthService.restorePasswordStepOne(email)
          if (response.status === 'success') {
            onSuccessAlert(response.message, '')
          } else {
            onErrorAlert('שגיאה', response.message)
          }
        } catch (e) {
          console.error('[ERROR AUTH SERIVEC]', e)
        } finally {
          set({ loading: false })
        }
      },

      restorePasswordStepTwo: async (
        email: string,
        token: string,
        password: string
      ) => {
        try {
          set({ loading: true })
          const response = await AuthService.restorePasswordStepTwo(
            email,
            token,
            password
          )
          if (response.status === 'success') {
            onSuccessAlert(response.message, '')
          } else {
            onErrorAlert('שגיאה', response.message)
          }
        } catch (e) {
          console.error('[ERROR AUTH SERIVEC]', e)
        } finally {
          set({ loading: false })
        }
      },

      logOut: () => {
        set({
          isAdmin: false,
          isAgent: false,
          isSuperAgent: false,
          user: null,
          agent: null,
        })
        localStorage.clear()
        removeFromStorage()
        set({ user: null })
        window.location.href = '/'
      },

      registerClient: async (data: formNewB2bForm) => {
        try {
          set({ loading: true })
          const response = await AuthService.createNewCustomer(data)
        } catch (e) {
          console.error('[ERROR AUTH SERIVEC]', e)
        } finally {
          set({ loading: false })
        }
      },

      //==========  METHODS ==========
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<AuthState, AuthState>
  )
)
