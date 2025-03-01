"use client";

import Chat from "@/components/Chat";
import { useParams } from "next/navigation";

export default function ChatPage() {
	const params = useParams();
	const chatId = params.id;
	return <Chat chatId={chatId} />;
}
