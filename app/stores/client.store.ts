import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ClientStore<T> {
  storeQueryData: T;
  setQueryData: (data: T) => void;
}

export const useClientStore = create<ClientStore<any>>()(
  persist(
    (set) => ({
      storeQueryData: {},
      setQueryData: (data) => set({ storeQueryData: data }),
    }),
    {
      name: 'client-data',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
