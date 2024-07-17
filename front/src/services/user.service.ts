import axios from 'axios'

export const userService = {
  async getUsers(search?: string): Promise<UsersResponse> {
    let apiUrl = `${process.env.REACT_APP_API}/api/users?itemsPerPage=100000&`
    if (search) {
      apiUrl += `&client.extId=${search}`
    }
    const response = await axios.get(apiUrl)
    return response.data
  },
}
