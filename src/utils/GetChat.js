const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { Anthropic } = require("@anthropic-ai/sdk");

// So we need to send a chat to the bot and get a response. Then handle recieving the response back.
// The way with google is wrong, we need to send a msg to the api & provide the history
// Then handle recieving it (probably easier that way too)
// So there's no 'start chat', it becomes sending message depending on the chosen bot
// And handling responses on our end (converting + storing)

// OpenAI and Claude work like this. It's only google that has their own "chat" thing lol

export async function sendAnthropicChat(previousMessages, model, message) {
	const transformedMessages = previousMessages.data.messages.map((msg) => ({
		role: msg.role === "user" ? "user" : "assistant",
		content: msg.content,
	}));

	const messagesWithUser = transformedMessages.push({
		role: "user",
		content: message,
	});

	console.log(messagesWithUser);

	const anthropic = new Anthropic({
		apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY,
		dangerouslyAllowBrowser: true,
	});

	const msg = await anthropic.messages.create({
		model: model, // "claude-3-5-haiku-latest" for now
		max_tokens: 1024,
		messages: messagesWithUser,
	});

	console.log(msg);
}

async function getGoogleChat(previousMessages) {
	const transformedMessages = previousMessages.data.messages.map((msg) => ({
		role: msg.role,
		parts: [{ text: msg.content }],
	}));

	const anthropicChat = await sendAnthropicChat(
		previousMessages,
		"claude-3-5-haiku-latest",
		"Hello mate if you get this say 123 im claude WOOO"
	);

	console.log(anthropicChat);

	const genAI = new GoogleGenerativeAI(
		process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_API_KEY
	);

	const model = genAI.getGenerativeModel({
		model: "gemini-2.0-flash",
	});

	const chat = model.startChat({
		system_instruction:
			"You are Whooosh Assistant, the primary AI for Whooosh.net. You are a friendly and knowledgeable assistant passionate about providing helpful and insightful responses. Your purpose is to deliver an AI experience that feels noticeably more thoughtful, structured, and helpful than standard AI interactions. **Communication Guidelines:** 1 - Provide well-organized answers with clear **key points** highlighted. 2 - Use bullet points, numbered lists, and code blocks when appropriate. 3 - Maintain a friendly and knowledgeable tone, adapting your formality to match the user's style. 4 - Prioritize actionable insights over theory. If the user's request is unclear in any way, ALWAYS ask clarifying questions before attempting to answer. 5 - When faced with ambiguous queries: Acknowledge the ambiguity specifically, ask focused clarifying questions, provide a provisional response to the most likely interpretation, and clearly label any assumptions made. 7 - Be concise while ensuring clarity. 7 - Avoid unnecessary explanations. **Domain Adaptation:** 1 - Technical: Provide working examples, explain concepts first. 2 - Creative: Offer varied options with reasoning. 3 - Advice: Present balanced perspectives, focus on frameworks. 4 - Remember: Your goal is to deliver an AI experience that exceeds user expectations. End with 1-2 thoughtful follow-up questions.",
		history: transformedMessages,
	});

	return chat;
}

export default async function GetChat(chatId, setMessages) {
	try {
		const previousMessages = await axios.get(`/api/chat/${chatId}`);

		setMessages(previousMessages.data.messages);

		console.log(previousMessages.data.messages);

		const chat = getGoogleChat(previousMessages);

		return { chat };
	} catch (err) {
		console.error("Error fetching messages: ", err);
	}
}
