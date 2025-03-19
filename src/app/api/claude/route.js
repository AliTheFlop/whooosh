import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(request) {
	try {
		const { model, previousMessages, message } = await request.json();
		let transformedMessages;
		let messagesWithUser;

		console.log(previousMessages);

		if (previousMessages.length > 0) {
			transformedMessages = previousMessages.map((msg) => ({
				role: msg.role === "user" ? "user" : "assistant",
				content: msg.content,
			}));

			messagesWithUser = [
				...transformedMessages,
				{
					role: "user",
					content: message,
				},
			];
		} else {
			messagesWithUser = [
				{
					role: "user",
					content: message,
				},
			];
		}

		const anthropic = new Anthropic({
			apiKey: process.env.ANTHROPIC_API_KEY,
		});

		const response = await anthropic.messages.create({
			model: model,
			max_tokens: 1024,
			messages: messagesWithUser,
		});

		return NextResponse.json(
			{ message: response.content[0].text },
			{ status: 201 }
		);
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: err }, { status: 500 });
	}
}
