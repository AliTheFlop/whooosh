import axios from "axios";

// const anthropicChat = await sendAnthropicChat(
// 	previousMessages,
// 	"claude-3-5-haiku-latest",
// 	"Hello mate if you get this say 123 im claude WOOO -> ALSO im trying something with the claude api, can you gimmie a rundown short summary of the conversation so far, if you've gotten any previous messsages? Thanks."
// );

// Claude //////////////////////////////////////////////////////////

export async function sendAnthropicChat(previousMessages, model, message) {
	try {
		const response = await axios.post("/api/claude", {
			model,
			previousMessages,
			message,
		});

		return response;
	} catch (err) {
		console.log(err);
	}
}

// Google //////////////////////////////////////////////////////////

export async function sendGoogleChat(previousMessages, model, message) {
	try {
		const response = await axios.post("/api/google", {
			model,
			previousMessages,
			message,
		});

		return response;
	} catch (err) {
		console.log(err);
	}
}
