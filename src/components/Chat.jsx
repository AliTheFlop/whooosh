"use client";

import UserMessage from "./UserMessage";
import useGlobalStore from "@/store/zustand";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect } from "react";
import AIResponse from "./AIResponse";
import axios from "axios";

export default function Chat({ chatId }) {
	const messages = useGlobalStore((state) => state.messages);
	const setMessages = useGlobalStore((state) => state.setMessages);
	const setCurrentChat = useGlobalStore((state) => state.setCurrentChat);
	const setCurrentChatId = useGlobalStore((state) => state.setCurrentChatId);
	const currentChatId = useGlobalStore((state) => state.currentChatId);

	useEffect(() => {
		async function setupChat() {
			try {
				const previousMessages = await axios.get(`/api/chat/${chatId}`);

				console.log(previousMessages.data.messages);

				setMessages(previousMessages.data.messages);

				const genAI = new GoogleGenerativeAI(
					process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_API_KEY
				);

				const model = genAI.getGenerativeModel({
					model: "gemini-2.0-flash",
				});

				const chat = model.startChat({
					system_instruction:
						"You are Whooosh Assistant, the primary AI for Whooosh.net. You are a friendly and knowledgeable assistant passionate about providing helpful and insightful responses. Your purpose is to deliver an AI experience that feels noticeably more thoughtful, structured, and helpful than standard AI interactions. **Communication Guidelines:** 1 - Provide well-organized answers with clear **key points** highlighted. 2 - Use bullet points, numbered lists, and code blocks when appropriate. 3 - Maintain a friendly and knowledgeable tone, adapting your formality to match the user's style. 4 - Prioritize actionable insights over theory. If the user's request is unclear in any way, ALWAYS ask clarifying questions before attempting to answer. 5 - When faced with ambiguous queries: Acknowledge the ambiguity specifically, ask focused clarifying questions, provide a provisional response to the most likely interpretation, and clearly label any assumptions made. 7 - Be concise while ensuring clarity. 7 - Avoid unnecessary explanations. **Domain Adaptation:** 1 - Technical: Provide working examples, explain concepts first. 2 - Creative: Offer varied options with reasoning. 3 - Advice: Present balanced perspectives, focus on frameworks. 4 - Remember: Your goal is to deliver an AI experience that exceeds user expectations. End with 1-2 thoughtful follow-up questions.",
					history: [messages],
				});

				setCurrentChatId(chatId);
				setCurrentChat(chat);
			} catch (error) {
				throw error;
			}
		}

		setupChat();
	}, []);

	return (
		<>
			<h1 className="text-center w-full">
				{currentChatId ? currentChatId : null}
			</h1>
			<div className="max-w-3xl mx-auto py-8 px-4">
				{messages.length > 0 ? (
					messages.map((message) =>
						message.type === "user" ? (
							<UserMessage
								content={message.content}
								key={message.id}
							/>
						) : (
							<AIResponse
								content={message.content}
								key={message.id}
							/>
						)
					)
				) : (
					<p className="w-full text-center">No messages yet!</p>
				)}
			</div>
		</>
	);
}
