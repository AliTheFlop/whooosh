import useGlobalStore from "@/store/zustand";
import axios from "axios";
import { useEffect, useState } from "react";
import ChatButton from "./ChatButton";

export default function ChatsSidebar(userId) {
	const [chats, setChats] = useState([]);
	const refreshChat = useGlobalStore((state) => state.refreshChat);
	const setRefreshChat = useGlobalStore((state) => state.setRefreshChat);
	const newChat = useGlobalStore((state) => state.newChat);
	const switchChat = useGlobalStore((state) => state.switchChat);
	const currentChatId = useGlobalStore((state) => state.currentChatId);

	function handleChatClick(id) {
		if (currentChatId === id) {
			return;
		}
		switchChat(id);
	}

	async function handleChatDelete(id) {
		try {
			const result = await axios.delete(`/api/chat/${id}`);
			setRefreshChat();
			newChat();
		} catch (error) {
			console.log(error);
		}
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
	}, [refreshChat]);

	return (
		<div className="p-4 flex flex-col gap-2 ">
			{chats.length > 0 ? (
				chats.map((chat) =>
					chat.chatTitle ? (
						<ChatButton
							chat={chat}
							handleChatClick={handleChatClick}
							handleChatDelete={handleChatDelete}
							key={chat._id}
						/>
					) : null
				)
			) : (
				<p>No chats yet!</p>
			)}
		</div>
	);
}
