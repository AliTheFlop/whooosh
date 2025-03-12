import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
	try {
		const { model, previousMessages, message } = await request.json();
		let transformedMessages;
		let messagesWithUser;

		if (previousMessages.length > 0) {
			transformedMessages = previousMessages.map((msg) => ({
				role: msg.role,
				parts: [{ text: msg.content }],
			}));

			messagesWithUser = [
				...transformedMessages,
				{
					role: "user",
					parts: [
						{
							text: message,
						},
					],
				},
			];
		} else {
			messagesWithUser = [
				{
					role: "user",
					parts: [
						{
							text: message,
						},
					],
				},
			];
		}

		const genAI = new GoogleGenerativeAI(
			process.env.GOOGLE_GENERATIVE_API_KEY
		);

		const useModel = genAI.getGenerativeModel({
			model: model,
		});

		const response = await useModel.generateContent({
			contents: [messagesWithUser],
			generationConfig: {
				maxOutputTokens: 1000,
			},
		});

		const aiResponse = response.response.text();

		if (aiResponse === "") {
			console.log("AI HAS NO RESPONSE! Check logs.");
			return NextResponse.json(
				{
					message: "An unexpected error occured! Empty AI response.",
					response: response,
				},
				{ status: 500 }
			);
		}

		return NextResponse.json({ message: aiResponse }, { status: 201 });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ error: err }, { status: 500 });
	}
}
