import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface RatingStore<T> {
  storeQueryData: T;
  setQueryData: (data: T) => void;
}

export const useRatingStore = create<RatingStore<any>>()(
  persist(
    (set) => ({
      storeQueryData: {},
      setQueryData: (data) => set({ storeQueryData: data }),
    }),
    {
      name: 'rating-data',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
