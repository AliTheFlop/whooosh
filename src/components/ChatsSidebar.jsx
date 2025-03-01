import useGlobalStore from "@/store/zustand";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ChatsSidebar(userId) {
	const [chats, setChats] = useState([]);
	const setCurrentChatId = useGlobalStore((state) => state.setCurrentChatId);

	function handleChatClick(id) {
		setCurrentChatId(id);
	}

	console.log("UserID: ", userId);
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
		<div className="p-4 flex flex-col gap-2">
			{chats.length > 0 ? (
				chats.map((chat) => (
					<div className="w-full focus:shadow-md" key={chat._id}>
						{chat.chatName}
					</div>
				))
			) : (
				<p>No chats yet!</p>
			)}
		</div>
	);
}
