import { create } from "zustand";
import axios from "axios";
import { v4 } from "uuid";
import GetChat from "@/utils/GetChat";
import SetupChat from "@/utils/SetupChat";
import DOMPurify from "dompurify";
import { sendAnthropicChat } from "@/utils/SendMessageHelpers";
import { sendGoogleChat } from "@/utils/SendMessageHelpers";
import { marked } from "marked";

const googleModels = ["gemini-2.0-flash", "gemini-1.5-flash"];
const claudeModels = [
	"claude-3-7-sonnet-latest",
	"claude-3-5-sonnet-latest",
	"claude-3-5-haiku-latest",
	"claude-3-opus-latest",
];

async function markdownToHtml(markdown) {
	try {
		marked.setOptions({
			gfm: true,
			breaks: true,
			pedantic: false,
		});
		return marked(markdown);
	} catch (error) {
		console.error("Markdown conversion failed:", error);
		// Fallback: wrap the markdown in a pre tag
		return `<div class="markdown-fallback"> ${markdown}</div>`;
	}
}

const useGlobalStore = create((set, get) => ({
	// Initializers
	user: null,
	messages: [],
	inputRef: null,
	isAnswering: false,
	activeModel: "claude-3-5-haiku-latest",
	currentChatId: null,
	isInitialized: false,
	currentChatTitle: "",
	refreshChat: false,

	// Setters
	setIsAnswering: (bool) => set({ isAnswering: bool }),
	setUser: (user) => set({ user }),
	newMessage: (message) =>
		set((state) => {
			const updatedMessages = [...state.messages];
			updatedMessages.push(message);
			return { messages: updatedMessages };
		}),
	setMessages: (messages) => set({ messages: messages }),
	setCurrentChat: (chat) => set({ currentChat: chat }),
	setCurrentChatId: (chatId) => set({ currentChatId: chatId }),
	setRefreshChat: () => set((state) => ({ refreshChat: !state.refreshChat })),

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

			state.setRefreshChat();

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
			if (googleModels.includes(state.activeModel)) {
				result = await sendGoogleChat(
					state.messages,
					state.activeModel,
					messageContent
				);
			} else if (claudeModels.includes(state.activeModel)) {
				result = await sendAnthropicChat(
					state.messages,
					state.activeModel,
					messageContent
				);
			}

			const markdownResponse = result.data.message;
			const htmlResponse = await markdownToHtml(markdownResponse);
			const sanitizedHtml = DOMPurify.sanitize(htmlResponse);

			console.log("Raw API response:", result);
			console.log("Markdown response:", markdownResponse);
			console.log("HTML response:", htmlResponse);
			console.log("Sanitized HTML:", sanitizedHtml);

			const aiResponse = {
				content: sanitizedHtml,
				id: v4(),
				chatId: localChatId,
				role: "model",
			};

			console.log("Adding AI response to state:", aiResponse);
			state.newMessage(aiResponse);

			await axios.post(
				`/api/chat/${encodeURIComponent(localChatId)}/message`,
				{
					userMessage,
					aiResponse,
				}
			);
		} catch (error) {
			console.error("Error details:", error);
			console.error("Error message:", error.message);
			console.error("Error stack:", error.stack);
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
