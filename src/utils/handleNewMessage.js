const axios = require("axios");
const { v4 } = require("uuid");

// Handle the first message in a chat

export async function handleFirstMessage(messageContent) {
	if (!isInitialized) {
		if (chatId) {
			const { chat } = await GetChat(chatId, setMessages);
			setCurrentChat(chat);
		} else {
			const { generatedChatId, chat } = await SetupChat(userId);
			setCurrentChat(chat);
			setCurrentChatId(generatedChatId);
		}
		setIsInitialized(true);
	}
}

//Handle all new messages

export async function handleNewMessage(
	setIsAnswering,
	currentChat,
	newMessage,
	inputRef,
	isAnswering,
	markdownToHtml,
	currentChatId
) {
	const messageContent = inputRef.current.value.trim();

	if (!messageContent || isAnswering) return;

	const userMessage = {
		content: messageContent,
		id: v4(),
		chatId: currentChatId,
		type: "user",
	};

	newMessage(userMessage);

	setIsAnswering(true);
	inputRef.current.value = "";

	// SEND CHAT TO GPT AND GET RESPONSEEE
	try {
		const result1 = await currentChat.sendMessage(messageContent);

		const markdownResponse = result1.response.text();
		const htmlResponse = await markdownToHtml(markdownResponse);

		const aiResponse = {
			content: htmlResponse,
			id: v4(),
			chatId: currentChatId,
			type: "ai",
		};

		newMessage(aiResponse);

		await axios.post(
			`/api/chat/${encodeURIComponent(currentChatId)}/message`,
			{ userMessage, aiResponse }
		);
	} catch (error) {
		console.log(error);
	}

	setIsAnswering(false);
}
