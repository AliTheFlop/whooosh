"use client";

import UserMessage from "./UserMessage";
import useGlobalStore from "@/store/zustand";
import { useEffect } from "react";
import AIResponse from "./AIResponse";

export default function Chat({ chatId, userId }) {
	const messages = useGlobalStore((state) => state.messages);
	const currentChatId = useGlobalStore((state) => state.currentChatId);
	const initializeChat = useGlobalStore((state) => state.initializeChat);

	useEffect(() => {
		if (chatId) {
			initializeChat(chatId, userId);
		}
	}, [chatId, userId]);

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
