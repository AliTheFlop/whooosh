const axios = require("axios");
const { v4 } = require("uuid");

export async function handleNewMessage(
	setIsAnswering,
	currentChat,
	newMessage,
	inputRef,
	isAnswering
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

		const aiResponse = {
			content: result1.response.text(),
			id: v4(),
			type: "ai",
		};

		newMessage(aiResponse);

		const saveMessageResponse = await axios.post(
			`/api/chat/${chatid}/message`,
			{ messageData, aiResponse }
		);
	} catch (error) {
		console.log(error);
	}

	setIsAnswering(false);
}
