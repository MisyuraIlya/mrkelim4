import { create } from 'zustand'

type arr = {
  value: string
  label: string
}

interface useCatalogState {
  listView: typeMode
  setListView: (value: typeMode) => void

  prodsPerPage: string
  setProdsPerPage: (value: string) => void
  prodsPerPageArr: arr[]

  sortProdSetting: string
  setSortProdSetting: (value: string) => void
  sortArr: arr[]
}

export const useCatalog = create<useCatalogState>((set, get) => ({
  listView: 'grid',
  setListView: (value: typeMode) => set({ listView: value }),

  prodsPerPage: '24',
  setProdsPerPage: (prodsPerPage) => set({ prodsPerPage }),
  prodsPerPageArr: [
    { value: '12', label: '12' },
    { value: '24', label: '24' },
    { value: '48', label: '48' },
  ],

  sortProdSetting: 'שם',
  setSortProdSetting: (sortProdSetting: string) => set({ sortProdSetting }),
  sortArr: [
    { value: '1', label: 'שם' },
    { value: 'isSpecial', label: 'מומלץ' },
    { value: 'isNew', label: 'חדש' },
  ],
}))
