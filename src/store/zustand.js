import { create } from "zustand";
import axios from "axios";
import { v4 } from "uuid";
import GetChat from "@/utils/GetChat";
import SetupChat from "@/utils/SetupChat";
import { remark } from "remark";
import html from "remark-html";
import DOMPurify from "dompurify";
import { sendAnthropicChat } from "@/utils/GetChat";

async function markdownToHtml(markdown) {
	const result = await remark().use(html).process(markdown);
	return result.toString();
}

const useGlobalStore = create((set, get) => ({
	// Initializers
	user: null,
	messages: [],
	inputRef: null,
	isAnswering: false,
	currentChat: null,
	currentChatId: null,
	isInitialized: false,

	// Setters
	setIsAnswering: (bool) => set({ isAnswering: bool }),
	setUser: (user) => set({ user }),
	newMessage: (message) =>
		set((state) => ({ messages: [...state.messages, message] })),
	setMessages: (messages) => set({ messages: messages }),
	setCurrentChat: (chat) => set({ currentChat: chat }),
	setCurrentChatId: (chatId) => set({ currentChatId: chatId }),

	// Functions

	// Initialize a new chat if there is none
	initializeChat: async (chatId, userId, chatTitle) => {
		const state = get();

		let chat;
		let generatedChatId;

		if (state.isInitialized) return;

		if (chatId) {
			const { chat } = await GetChat(chatId, state.setMessages);

			set({
				currentChat: chat,
				currentChatId: chatId,
				isInitialized: true,
			});
		} else {
			const result = await SetupChat(userId, chatTitle);

			console.log(result);

			chat = result.chat;
			generatedChatId = result.generatedChatId;

			set({
				currentChat: chat,
				currentChatId: result.generatedChatId,
				isInitialized: true,
			});
		}

		return { chat, generatedChatId };
	},

	// Handle any message & initialize a chat if doesn't exist
	handleMessage: async (messageContent) => {
		const state = get();
		let localChat;
		let localChatId;

		if (!messageContent || state.isAnswering) return;

		// Initialize new chat if it hasn't been done yet
		// If state.currentChatId is NULL (so there's no active chat)
		// Then it'll make a new one and return the ID and Chat object
		// For local use

		console.log(messageContent.split(" ").slice(0, 8).join(" "));
		if (!state.isInitialized) {
			const { chat, generatedChatId } = await state.initializeChat(
				state.currentChatId,
				state.user?.id,
				messageContent.split(" ").slice(0, 8).join(" ")
			);

			// Set chat and chatId for use
			localChat = chat;
			localChatId = generatedChatId;
		}

		if (!localChatId) {
			localChatId = state.currentChatId;
		}

		const userMessage = {
			role: "user",
			content: messageContent,
			userId: state.user.id,
			id: v4(),
			chatId: localChatId,
		};

		state.newMessage(userMessage);

		set({ isAnswering: true });

		try {
			let result;

			if (localChat) {
				result = await localChat.sendMessage(messageContent);
			} else {
				result = await state.currentChat.sendMessage(messageContent);
			}

			const markdownResponse = result.response.text();
			const htmlResponse = await markdownToHtml(markdownResponse);
			const sanitizedHtml = DOMPurify.sanitize(htmlResponse);

			const aiResponse = {
				content: sanitizedHtml,
				id: v4(),
				chatId: localChatId,
				role: "model",
			};

			state.newMessage(aiResponse);

			await axios.post(
				`/api/chat/${encodeURIComponent(localChatId)}/message`,
				{
					userMessage,
					aiResponse,
				}
			);
		} catch (error) {
			console.error(error);
		}

		set({ isAnswering: false });
	},
	// Setup new chat
	switchChat: (newChatId) => {
		const state = get();
		if (!newChatId) return;

		state.messages = [];
		state.isInitialized = false;

		state.initializeChat(newChatId);
	},
}));

export default useGlobalStore;
