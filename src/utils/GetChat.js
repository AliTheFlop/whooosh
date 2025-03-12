const axios = require("axios");

// So we need to send a chat to the bot and get a response. Then handle recieving the response back.
// The way with google is wrong, we need to send a msg to the api & provide the history
// Then handle recieving it (probably easier that way too)
// So there's no 'start chat', it becomes sending message depending on the chosen bot
// And handling responses on our end (converting + storing)
// OpenAI and Claude work like this. It's only google that has their own "chat" thing lol

export default async function GetChat(chatId, setMessages) {
	try {
		const result = await axios.get(`/api/chat/${chatId}`);

		setMessages(result.data.messages);

		return { success: true, chatTitle: result.data.chatTitle };
	} catch (err) {
		console.error("Error fetching messages: ", err);
		return { error: true, message: err };
	}
}
