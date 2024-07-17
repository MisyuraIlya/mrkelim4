import axios from 'axios'
interface UserDocsResponse {
  status: 'success' | 'error'
  data: UserDocs[]
  message: string
}

interface UserCreateDocResponse {
  status: 'success' | 'error'
  data: any
  message: string
}

export const AuthService = {
  async login(username: string, password: string): Promise<IAuthResponse> {
    const response = await axios.post(`${process.env.REACT_APP_API}/api/auth`, {
      username,
      password,
    })

    return response.data
  },
  async getAccessToken(refreshToken: string): Promise<IAuthResponse> {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/api/auth/refresh`,
      {
        refresh_token: refreshToken,
      }
    )
    return response.data
  },
  async validation(
    userExId: string,
    phone: string
  ): Promise<IValidationResponse> {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/auth/validation`,
      {
        exId: userExId,
        phone,
      }
    )
    return response.data
  },
  async registration(
    extId: string,
    username: string,
    password: string,
    phone: string,
    token: string
  ): Promise<IDefaultAuthResponse> {
    const response = await axios.put(
      `${process.env.REACT_APP_API}/auth/registration`,
      {
        extId,
        username,
        password,
        phone,
        token,
      }
    )
    return response.data
  },

  async restorePasswordStepOne(email: string): Promise<IDefaultAuthResponse> {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/auth/restorePasswordStepOne`,
      {
        email,
      }
    )
    return response.data
  },

  async restorePasswordStepTwo(
    email: string,
    token: string,
    password: string
  ): Promise<IDefaultAuthResponse> {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/auth/restorePasswordStepTwo`,
      {
        email,
        token,
        password,
      }
    )
    return response.data
  },

  async createNewCustomer(data: formNewB2bForm) {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/auth/createUser`,
      data
    )
    return response.data
  },

  async getUserDocs(userExtId: string): Promise<UserDocsResponse> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/userDocs?userExtId=${userExtId}`
    )
    return response.data
  },

  async createUserDocs(
    userExtId: string,
    title: string,
    base64Pdf: string
  ): Promise<UserCreateDocResponse> {
    const response = await axios.post(`${process.env.REACT_APP_API}/userDocs`, {
      userExtId,
      title,
      base64Pdf,
    })
    return response.data
  },
}
