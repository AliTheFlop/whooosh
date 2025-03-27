import { Trash2 } from "lucide-react";

export default function ChatButton({
	chat,
	handleChatClick,
	handleChatDelete,
}) {
	return (
		<div className="relative group w-full">
			{" "}
			{/* Relative for positioning, group for hover target */}
			<button
				className="w-full text-start px-5 py-2 rounded-sm text-ellipsis overflow-hidden whitespace-nowrap text-sm font-medium group-hover:bg-gray-300 transition-all duration-200"
				key={chat._id}
				onClick={() => handleChatClick(chat._id)}
			>
				{chat.chatTitle}
			</button>
			<button
				onClick={(e) => {
					e.stopPropagation(); // Prevent chat click
					handleChatDelete(chat._id);
				}}
				className="absolute top-0 right-0 h-full w-8 flex items-center justify-center text-red-500 group-hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200" // Hidden by default, visible on hover
			>
				<Trash2 />
			</button>
		</div>
	);
}
