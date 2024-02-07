import { create } from 'zustand';

type GeneralStore = {
  loader: Boolean;
  setLoader: (loader: Boolean) => void;
};

const generalStore = create<GeneralStore>((set) => ({
  loader: false,
  setLoader: (loader) => set({ loader }),
}));

export default generalStore;
