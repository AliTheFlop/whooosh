const axios = require("axios");

// We can use model.generateContent instead of making a chat
// https://ai.google.dev/gemini-api/docs/text-generation?lang=node

export default async function SetupChat(userId, chatTitle) {
	// If there's no chatId we setup the chat & add it to the DB
	try {
		const result = await axios.post(`/api/chat`, {
			userId,
			chatTitle,
		});

		const generatedChatId = result.data.generatedChatId;

		return generatedChatId;
	} catch (error) {
		return { error: true, error_message: error };
	}
}
