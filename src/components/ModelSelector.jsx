import useGlobalStore from "@/store/zustand";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const models = {
	"claude-3-7-sonnet-latest": {
		name: "Claude 3.7 Sonnet",
		icon: "/model-icons/claude-3.7-sonnet.png",
	},
	"claude-3-5-sonnet-latest": {
		name: "Claude 3.5 Sonnet",
		icon: "/model-icons/claude-3.5-sonnet.png",
	},
	"claude-3-5-haiku-latest": {
		name: "Claude 3.5 Haiku",
		icon: "/model-icons/claude-3.5-haiku.png",
	},
	"claude-3-opus-latest": {
		name: "Claude 3.0 Opus",
		icon: "/model-icons/claude-3.0-opus.png",
	},
	"gemini-2.0-flash": {
		name: "Gemini 2.0 Flash",
		icon: "/model-icons/gemini-2.0-flash.png",
	},
	"gemini-1.5-flash": {
		name: "Gemini 1.5 Flash",
		icon: "/model-icons/gemini-1.5-flash.png",
	},
};

export default function ModelSelector() {
	const activeModel = useGlobalStore((state) => state.activeModel);
	const setActiveModel = useGlobalStore((state) => state.setActiveModel);
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef(null);

	useEffect(() => {
		// Function to handle clicks outside of the component
		function handleClickOutside(event) {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target)
			) {
				setIsOpen(false);
			}
		}

		// Add event listener when dropdown is open
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		// Clean up the event listener
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	function handleChangeModel(key) {
		setActiveModel(key);
		setIsOpen(false);
	}

	const currentModel = models[activeModel];
	return (
		<div
			className="relative flex items-center justify-start"
			ref={containerRef}
		>
			{/* Trigger Button */}
			<div
				className="flex flex-row rounded-lg pr-4 pb-2 gap-2 hover:bg-gray-50 cursor-pointer transition-colors duration-150 items-center"
				onClick={() => setIsOpen((prev) => !prev)}
			>
				<Image
					src={currentModel.icon}
					alt={currentModel.name}
					width={24}
					height={24}
				/>
				<span className="text-gray-700 text-sm font-bold">
					{currentModel.name}
				</span>
			</div>

			{/* Dropdown Menu */}
			<div
				className={`${
					isOpen
						? "opacity-100 translate-y-0"
						: "opacity-0 translate-y-2 pointer-events-none"
				} absolute bottom-12 flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-150 ease-in-out`}
				style={{ minWidth: "max-content" }}
			>
				{Object.entries(models).map(([key, model]) => (
					<div
						key={key}
						onClick={() => handleChangeModel(key, model)}
						className="flex flex-row items-center p-3 px-2 gap-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-none whitespace-nowrap"
					>
						<Image
							src={model.icon}
							alt={model.name}
							width={24}
							height={24}
						/>
						<span className="text-gray-700 hover:text-blue-800 text-sm font-bold">
							{model.name}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
