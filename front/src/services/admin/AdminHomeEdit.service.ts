import axios from 'axios'

interface getAdminHomeEditResponse extends Hydra {
  'hydra:member': IHomeEdit[]
}

export const AdminHomeEditService = {
  async getHomeEdits(): Promise<getAdminHomeEditResponse> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/home_edits`
    )
    return response.data
  },

  async dragAndDropEdit(arr: IHomeEdit[]) {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/dragAndDrop/homeEdit`,
      arr
    )
    return response.data
  },

  async updateHome(data: any): Promise<IHomeEdit> {
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/api/home_edits/${data.id}`,
      data,
      {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      }
    )

    return response.data
  },

  async createHomeEdits(data: any) {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/api/home_edits`,
      data
    )
    return response.data
  },

  async deleteHomeEdit(id: number): Promise<void> {
    await axios.delete(`${process.env.REACT_APP_API}/api/home_edits/${id}`)
  },
}
