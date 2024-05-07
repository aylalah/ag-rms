import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type RatingsProp = {
  id: string;
  ratingTitle: string;
  clientName: string;
};

interface RatingStore<T> {
  storeQueryData: T;
  setQueryData: (data: T) => void;
  ratingsData: RatingsProp[];
  setRatings: (ratingsData?: RatingsProp[]) => void;
}

export const useRatingStore = create<RatingStore<any>>()(
  persist(
    (set) => ({
      storeQueryData: {},
      setQueryData: (data) => set({ storeQueryData: data }),
      ratingsData: [],
      setRatings: (ratingsData) => set({ ratingsData }),
    }),
    {
      name: 'rating-data',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
