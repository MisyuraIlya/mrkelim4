import { create } from 'zustand'
import { persist, createJSONStorage, PersistOptions } from 'zustand/middleware'

interface useDocumentStore {
  searchProducts: string
  setSearchProducts: (search: string) => void
}

export const useDocumentStore = create(
  persist(
    (set, get) => ({
      searchProducts: '',
      setSearchProducts: (searchProducts) => set({ searchProducts }),
    }),
    {
      name: 'document-storage',
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<useDocumentStore, useDocumentStore>
  )
)
