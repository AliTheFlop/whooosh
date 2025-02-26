"use client";

import { SearchIcon } from "lucide-react";
import UserMessage from "@/components/UserMessage";
import useGlobalStore from "@/store/zustand";

export default function Home() {
	const user = useGlobalStore((state) => state.user);
	const setUser = useGlobalStore((state) => state.setUser);

	return (
		<div className="flex min-h-screen bg-white">
			{/* Sidebar */}
			<div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
				{/* Logo */}
				<div className="p-6">
					<h3 className="text-2xl font-semibold text-gray-800">
						Whooosh
					</h3>
				</div>

				{/* Navigation Area */}
				<div className="flex-1">{/* Add nav items here */}</div>

				{/* Logout */}
				<button
					className="m-4 p-3.5 rounded-lg 
                        bg-gray-100 
                        hover:bg-gray-200 
                        text-gray-700 
                        font-medium
                        transition-all duration-200"
				>
					Logout
				</button>
			</div>

			{/* Chat Area */}
			<div className="flex-1 flex flex-col bg-white">
				{/* Messages */}
				<div className="flex-1 overflow-y-auto">
					<div className="max-w-3xl mx-auto py-8 px-4">
						<UserMessage content="I wanna make a new golden stuff!" />
					</div>
				</div>

				{/* Input */}
				<div className="border-t border-gray-100 p-4">
					<div className="max-w-3xl mx-auto relative">
						<span className="absolute left-4 top-1/2 -translate-y-1/2">
							<SearchIcon size={20} className="text-gray-400" />
						</span>
						<input
							type="text"
							className="w-full h-12 pl-12 rounded-lg
                                bg-gray-50
                                border border-gray-200
                                text-gray-800
                                placeholder-gray-400
                                focus:border-blue-500
                                focus:ring-1 focus:ring-blue-500
                                focus:outline-none
                                transition-colors"
							placeholder="Let's get a chat going!"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
