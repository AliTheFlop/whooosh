const axios = require("axios");
const { v4 } = require("uuid");

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

	const messageData = {
		content: messageContent,
		id: v4(),
		type: "user",
	};

	newMessage(messageData);

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
			type: "ai",
		};

		newMessage(aiResponse);

		const saveMessageResponse = await axios.post(
			`/api/chat/${encodeURIComponent(currentChatId)}/message`,
			{ messageData, aiResponse }
		);
	} catch (error) {
		console.log(error);
	}

	setIsAnswering(false);
}
