import Cookies from 'js-cookie'

export const getRefreshToken = () => {
  const accessToken = Cookies.get('accessToken')
  return accessToken || null
}

export const getAccessToken = () => {
  const accessToken = Cookies.get('accessToken')
  return accessToken || null
}

export const updateAccessToken = (data: ITokens) => {
  Cookies.set('accessToken', data.token)
}

export const saveTokensStorage = (data: ITokens) => {
  Cookies.set('accessToken', data.token)
  Cookies.set('refreshToken', data.refresh_token)
}

export const removeFromStorage = () => {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
}

export const saveToStorage = (data: IAuthResponse): void => {
  saveTokensStorage(data)
}
