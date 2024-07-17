import { create } from 'zustand'

interface useSelectedProductState {
  selectedProd: IProduct
}

interface useSelectedProductMethods {
  changeDefaultImage: (imagePath: string) => void
  setSelectedProd: (element: IProduct) => void
}

export const useSelectedProduct = create<
  useSelectedProductState & useSelectedProductMethods
>((set, get) => ({
  selectedProd: {} as IProduct,
  changeDefaultImage: (imagePath: string) => {
    const prod = get().selectedProd
    prod.defaultImagePath = imagePath
    set({ selectedProd: prod })
  },
  setSelectedProd: (element: IProduct) => {
    set({ selectedProd: element })
  },
}))
