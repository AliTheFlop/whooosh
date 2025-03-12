import useGlobalStore from "@/store/zustand";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ChatsSidebar(userId) {
	const [chats, setChats] = useState([]);
	const switchChat = useGlobalStore((state) => state.switchChat);
	const currentChatId = useGlobalStore((state) => state.currentChatId);

	function handleChatClick(id) {
		// Reset messages
		// Set the new chatId
		// Reload the messages
		// Scroll to the bottom
		// Maybe add a loading effect
		if (currentChatId === id) {
			return;
		}
		switchChat(id);
	}

	useEffect(() => {
		async function getUserChats() {
			try {
				const chats = await axios.get(`/api/chats/${userId.userId}`);

				setChats(chats.data.chats);
			} catch (err) {
				throw err;
			}
		}

		getUserChats();
	}, []);

	return (
		<div className="p-4 flex flex-col gap-2 ">
			{chats.length > 0 ? (
				chats.map((chat) =>
					chat.chatTitle ? (
						<button
							className="w-full text-start px-2 py-2 my-1 text-clip overflow-hidden whitespace-nowrap text-base font-medium hover:ring-gray-500 hover:ring-1 "
							key={chat._id}
							onClick={() => handleChatClick(chat._id)}
						>
							{chat.chatTitle}
						</button>
					) : null
				)
			) : (
				<p>No chats yet!</p>
			)}
		</div>
	);
}
