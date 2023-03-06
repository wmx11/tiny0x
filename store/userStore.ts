import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: { test: true },
  setUser: (user: any) => set({ user }),
  deleteUser: () => set({ user: null }),
}));

export default useUserStore;
