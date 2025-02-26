import { create } from "zustand";

const useGlobalStore = create((set) => ({
	user: null,
	setUser: (user) => set({ user }),
}));

export default useGlobalStore;
