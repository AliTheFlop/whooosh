import { create } from "zustand";

const useGlobalStore = create((set) => ({
	user: null,
	messages: [],
	inputRef: null,
	isAnswering: false,
	currentChat: null,
	currentChatId: null,
	setIsAnswering: (bool) => set({ isAnswering: bool }),
	setUser: (user) => set({ user }),
	newMessage: (message) =>
		set((state) => ({ messages: [...state.messages, message] })),
	setMessages: (messages) => set({ messages: messages }),
	setCurrentChat: (chat) => set({ currentChat: chat }),
	setCurrentChatId: (chatId) => set({ currentChatId: chatId }),
}));

export default useGlobalStore;
