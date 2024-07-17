import axios from 'axios'

interface agentServiceResponse extends Hydra {
  'hydra:member': IUser[]
}

export const agentService = {
  async getClients(
    agentId: string,
    page: string | number = '1',
    search?: string
  ): Promise<agentServiceResponse> {
    console.log('page', page)
    let apiUrl = `${process.env.REACT_APP_API}/api/agentClients/${agentId}?page=${page}`

    if (search) {
      apiUrl += `&search=${search}`
    }

    const response = await axios.get(apiUrl)
    return response.data
  },
}
