import { create } from "zustand";

const useGlobalStore = create((set) => ({
	user: null,
	messages: [],
	inputRef: null,
	isAnswering: false,
	setIsAnswering: (bool) => set({ isAnswering: bool }),
	setUser: (user) => set({ user }),
	newMessage: (message) =>
		set((state) => ({ messages: [...state.messages, message] })),
}));

export default useGlobalStore;
