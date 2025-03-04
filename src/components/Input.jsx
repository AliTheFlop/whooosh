"use client";

import useGlobalStore from "@/store/zustand";
import Spinner from "@/components/Spinner";
import { SearchIcon } from "lucide-react";

import { handleNewMessage } from "@/utils/handleNewMessage";

import { useRef } from "react";

export default function Input() {
	const isAnswering = useGlobalStore((state) => state.isAnswering);
	const handleMessage = useGlobalStore((state) => state.handleMessage);

	const inputRef = useRef();

	function sendMessage() {
		const messageContent = inputRef.current.value.trim();

		if (messageContent) {
			handleMessage(messageContent);
			inputRef.current.value = "";
		}
	}

	return (
		<div className="border-t border-gray-100 p-4">
			<div className="max-w-3xl mx-auto relative flex flex-row items-center">
				<span className="absolute left-4 top-1/2 -translate-y-1/2">
					<SearchIcon size={20} className="text-gray-400" />
				</span>
				<textarea
					className="mainTextInput w-5/6 min-h-12 h-auto max-x-36 pl-12 rounded-lg
							bg-gray-50
							border border-gray-200
							text-gray-800
							placeholder-gray-400
							focus:border-blue-500
							focus:ring-1 focus:ring-blue-500
							focus:outline-none
							transition-colors
							resize-vertical overflow-hidden
							leading-tight py-3"
					placeholder="Let's get a chat going!"
					ref={inputRef}
					rows="1"
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							sendMessage();
						}
					}}
					style={{
						minHeight: "48px",
						maxHeight: "120px",
					}}
				/>
				{isAnswering ? (
					<Spinner />
				) : (
					<button
						className="ml-4 p-1 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-md transition-all duration-200 flex items-center justify-center"
						onClick={handleNewMessage}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line x1="12" y1="19" x2="12" y2="5"></line>
							<polyline points="5 12 12 5 19 12"></polyline>
						</svg>
					</button>
				)}
			</div>
		</div>
	);
}
