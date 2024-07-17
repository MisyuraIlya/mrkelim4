import axios from 'axios'

interface productResponse extends Hydra {
  'hydra:member': IProduct[]
}

export const AdminProductService = {
  async createNewImage(product: any): Promise<IImagePath> {
    const response = await axios.post(
      `${process.env.REACT_APP_API}/api/product_images`,
      product
    )

    return response.data
  },

  async updateProduct(product: any): Promise<IProduct> {
    const response = await axios.patch(
      `${process.env.REACT_APP_API}/api/products/${product.id}`,
      product,
      {
        headers: {
          'Content-Type': 'application/merge-patch+json',
        },
      }
    )

    return response.data
  },

  async deleteImage(imageId: number | string) {
    const response = await axios.delete(
      `${process.env.REACT_APP_API}/api/product_images/${imageId}`
    )

    return response.data
  },

  async GetProducts(
    lvl1: number | string,
    lvl2: number | string,
    lvl3: number | string,
    showAll: boolean | null = false
  ): Promise<productResponse> {
    let url = `${process.env.REACT_APP_API}/api/catalog/catalog/${lvl1}/${lvl2}/${lvl3}`

    if (showAll) {
      url += '?showAll=true'
    }

    const response = await axios.get(url)
    return response.data
  },
}
