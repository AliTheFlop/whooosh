"use client";

import useGlobalStore from "@/store/zustand";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import NewChat from "@/components/NewChat";
import { useEffect } from "react";
import Chat from "@/components/Chat";
import Input from "@/components/Input";

export default function Home() {
	const setUser = useGlobalStore((state) => state.setUser);
	const currentChatId = useGlobalStore((state) => state.currentChatId);
	const { data: session, status } = useSession();

	useEffect(() => {
		if (session) {
			setUser(session.user);
		}
	}, [session, setUser]);

	return (
		<div className="flex min-h-screen max-h-screen bg-white">
			<Sidebar />

			{/* Chat Area */}
			<div className="flex-1 flex flex-col bg-white">
				{/* Messages */}
				<div className="flex-1 overflow-y-auto overflow-x-hidden">
					{currentChatId ? (
						<Chat chatId={currentChatId} />
					) : (
						<NewChat />
					)}
				</div>

				{/* Input */}
				<Input />
			</div>
		</div>
	);
}
