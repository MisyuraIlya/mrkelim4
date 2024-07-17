import { create } from 'zustand'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'

interface useAdminStore {
  searchProducts: string
  setSearchProducts: (search: string) => void
  searchCategories: string
  setSearchCategories: (search: string) => void
  searchClients: string
  setSearchClients: (search: string) => void
  choosedItemNotification: INotification | null
  setChoosedItemNotification: (value: INotification | null) => void
}

export const useAdminStore = create(
  persist(
    (set, get) => ({
      searchProducts: '',
      setSearchProducts: (searchProducts) => set({ searchProducts }),
      searchCategories: '',
      setSearchCategories: (searchCategories) => set({ searchCategories }),
      searchClients: '',
      setSearchClients: (searchClients) => set({ searchClients }),
      choosedItemNotification: null,
      setChoosedItemNotification: (value: INotification | null) =>
        set({ choosedItemNotification: value }),
    }),
    {
      name: 'admin-storage',
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<useAdminStore, useAdminStore>
  )
)
