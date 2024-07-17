import axios from 'axios'

interface getAdminCategooryResponse extends Hydra {
  'hydra:member': ICategory[]
}

export const AdminCatalogService = {
  async getAdminCategoory(
    lvl1: string,
    lvl2: string
  ): Promise<getAdminCategooryResponse> {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/adminCategories/${lvl1}/${lvl2}`
    )
    return response.data
  },

  async updateCategory(category: any): Promise<ICategory> {
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/api/categories/${category.id}`,
      category,
      {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      }
    )

    return response.data
  },

  async dragAndDropCategories(category: ICategory[]): Promise<ICategory> {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/dragAndDrop/categories`,
      category,
      {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      }
    )

    return response.data
  },
}
