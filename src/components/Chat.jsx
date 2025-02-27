"use client";

import UserMessage from "./UserMessage";
import useGlobalStore from "@/store/zustand";

export default function Chat({ chatid }) {
	const messages = useGlobalStore((state) => state.messages);

	return (
		<>
			<h1 className="text-center w-full">{chatid}</h1>
			<div className="max-w-3xl mx-auto py-8 px-4">
				{messages.length > 0 ? (
					messages.map((message) => (
						<UserMessage
							content={message.content}
							key={message.id}
						/>
					))
				) : (
					<UserMessage content="i'm so cool" />
				)}
			</div>
		</>
	);
}
