import axios from 'axios'

interface updateAuthResponse {
  data: null
  message: string
  status: 'success' | 'error'
}

export const AdminClinetsService = {
  async getUsers(
    roleType: ROLE_TYPES,
    page: string | number,
    search?: string
  ): Promise<UsersResponse> {
    let isAgent = false
    if (roleType == 'ROLE_SUPER_AGENT' || roleType === 'ROLE_AGENT')
      isAgent = true
    let url = `${process.env.REACT_APP_API}/api/users?page=${page}&isAgent=${isAgent}&isBlocked=false`

    if (search) {
      url += `&search=${search}`
    }

    const response = await axios.get(url)
    return response.data
  },

  async getClientItem(userId: string | number): Promise<IUser> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/users/${userId}`
    )
    return response.data
  },

  async createClient(user: IUser): Promise<IUser> {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/auth/createAgent`,
      user
    )
    return response.data
  },

  async updateClient(user: IUser): Promise<updateAuthResponse> {
    delete user.roles
    const response = await axios.post(
      `${process.env.REACT_APP_API}/auth/updateUser`,
      user
    )
    return response.data
  },
}
