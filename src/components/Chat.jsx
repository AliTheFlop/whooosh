"use client";

import UserMessage from "./UserMessage";
import useGlobalStore from "@/store/zustand";
import { useEffect, useRef } from "react";
import AIResponse from "./AIResponse";

export default function Chat({ chatId, userId }) {
	const messages = useGlobalStore((state) => state.messages);
	const initializeChat = useGlobalStore((state) => state.initializeChat);
	const currentChatTitle = useGlobalStore((state) => state.currentChatTitle);

	const waypointRef = useRef(null);
	const containerRef = useRef(null);

	function scrollToBottom() {
		if (waypointRef.current) {
			waypointRef.current.scrollIntoView({
				behavior: "smooth",
				block: "end",
			});
		}
	}

	useEffect(() => {
		if (chatId) {
			initializeChat(chatId, userId);
		}
	}, [chatId, userId]);

	useEffect(() => {
		setTimeout(scrollToBottom, 100);
	}, [messages]);

	return (
		<>
			{currentChatTitle ? (
				<div className="w-full border-b h-12 flex items-center justify-start bg-white">
					<h1 className="ml-4 font-semibold text-regular">
						{currentChatTitle ? currentChatTitle : null}
					</h1>
				</div>
			) : null}

			<div className="max-w-3xl mx-auto py-8 px-4" ref={containerRef}>
				{messages.length > 0 ? (
					messages.map((message) =>
						message.role === "user" ? (
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
				<div id="waypointContainer" ref={waypointRef}></div>
			</div>
		</>
	);
}
