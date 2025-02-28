import { create } from "zustand";

const useGlobalStore = create((set) => ({
	user: null,
	messages: [],
	inputRef: null,
	isAnswering: false,
	currentChat: null,
	setIsAnswering: (bool) => set({ isAnswering: bool }),
	setUser: (user) => set({ user }),
	newMessage: (message) =>
		set((state) => ({ messages: [...state.messages, message] })),
	setCurrentChat: (chat) => set({ currentChat: chat }),
}));

export default useGlobalStore;
