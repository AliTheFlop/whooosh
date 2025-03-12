import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(request) {
	try {
		const { model, previousMessages, message } = await request.json();

		const transformedMessages = previousMessages.data.messages.map(
			(msg) => ({
				role: msg.role === "user" ? "user" : "assistant",
				content: msg.content,
			})
		);

		const messagesWithUser = [
			...transformedMessages,
			{
				role: "user",
				content: message,
			},
		];

		const anthropic = new Anthropic({
			apiKey: process.env.ANTHROPIC_API_KEY,
		});

		const response = await anthropic.messages.create({
			model: model, // "claude-3-5-haiku-latest" for now
			max_tokens: 1024,
			messages: messagesWithUser,
		});

		return NextResponse.json({ message: response }, { status: 201 });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: err }, { status: 500 });
	}
}
