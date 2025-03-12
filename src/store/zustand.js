import { create } from "zustand";
import axios from "axios";
import { v4 } from "uuid";
import GetChat from "@/utils/GetChat";
import SetupChat from "@/utils/SetupChat";
import { remark } from "remark";
import html from "remark-html";
import DOMPurify from "dompurify";
import { sendAnthropicChat } from "@/utils/GetChat";
import { sendGoogleChat } from "@/utils/SendMessageHelpers";

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
	activeModel: "gemini-2.0-flash",
	currentChatId: null,
	isInitialized: false,
	currentChatTitle: "",

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

		if (state.isInitialized) return;

		// If chatId given, get messages
		if (chatId) {
			const result = await GetChat(chatId, state.setMessages);

			if (!result.success) {
				console.error(result.message);
			}

			set({
				currentChatId: chatId,
				isInitialized: true,
				currentChatTitle: result.chatTitle,
			});
		} else {
			const result = await SetupChat(userId, chatTitle);

			const generatedChatId = result;

			set({
				currentChatId: generatedChatId,
				isInitialized: true,
				currentChatTitle: chatTitle,
			});

			return generatedChatId;
		}
	},

	// Handle any message & initialize a chat if doesn't exist
	handleMessage: async (messageContent) => {
		const state = get();
		let localChatId;

		if (!messageContent || state.isAnswering) return;

		// Initialize new chat if it hasn't been done yet
		// If state.currentChatId is NULL (so there's no active chat)
		// Then it'll make a new one and return the ID and Chat object
		// For local use

		console.log(messageContent.split(" ").slice(0, 8).join(" "));
		if (!state.isInitialized) {
			const generatedChatId = await state.initializeChat(
				state.currentChatId,
				state.user?.id,
				messageContent.split(" ").slice(0, 8).join(" ")
			);

			// Set chatId for use
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
			if (state.activeModel === "gemini-2.0-flash") {
				console.log(state.messages);
				result = await sendGoogleChat(
					state.messages,
					state.activeModel,
					messageContent
				);

				console.log(result);
			}

			const markdownResponse = result.data.message;
			console.log(markdownResponse);
			const htmlResponse = await markdownToHtml(markdownResponse);
			console.log(htmlResponse);
			const sanitizedHtml = DOMPurify.sanitize(htmlResponse);
			console.log(sanitizedHtml);

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
	// Switch to another, older chat
	switchChat: (newChatId) => {
		const state = get();
		if (!newChatId) return;

		state.messages = [];
		state.isInitialized = false;

		state.initializeChat(newChatId);
	},
	// Setup new chat
	newChat: () => {
		set({
			messages: [],
			currentChatId: null,
			isInitialized: false,
			currentChatTitle: "",
		});
	},
}));

export default useGlobalStore;
