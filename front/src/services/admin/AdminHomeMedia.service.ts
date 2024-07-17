import axios from 'axios'

interface getAdminHomeMediaResponse extends Hydra {
  'hydra:member': IHomeMedia[]
}

export const AdminHomeMediaService = {
  async getHomeMedia(): Promise<getAdminHomeMediaResponse> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/home_media`
    )
    return response.data
  },

  async createHomeMedia(data: any) {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/api/home_media`,
      data
    )
    return response.data
  },

  async updateHomeMedia(data: any): Promise<IHomeEdit> {
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/api/home_media/${data.id}`,
      data,
      {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      }
    )
    return response.data
  },

  async deleteHomeMedia(id: number): Promise<void> {
    await axios.delete(`${process.env.REACT_APP_API}/api/home_media/${id}`)
  },
}
