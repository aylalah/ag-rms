import { create } from "zustand";

type UserStore = {
  user: User;
  client: Client;
  setUser: (user: User) => void;
  setClient: (client: Client) => void;
};

const userStore = create<UserStore>((set) => ({
  user: {} as User,
  client: {} as Client,
  setUser: (user) => set({ user }),
  setClient: (client) => set({ client }),
}));

export default userStore;
