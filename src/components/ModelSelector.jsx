import useGlobalStore from "@/store/zustand";
import Image from "next/image";
import { useState } from "react";

const models = {
	"claude-3-7-sonnet-latest": {
		name: "Claude 3.7 Sonnet",
		icon: "/images/model-icons/claude-3.7-sonnet.svg",
	},
	"claude-3-5-sonnet-latest": {
		name: "Claude 3.5 Sonnet",
		icon: "/images/model-icons/claude-3.5-sonnet.svg",
	},
	"claude-3-5-haiku-latest": {
		name: "Claude 3.5 Haiku",
		icon: "/model-icons/claude-3.5-haiku.png",
	},
	"claude-3-opus-latest": {
		name: "Claude 3.0 Opus",
		icon: "/images/model-icons/claude-3.0-opus.svg",
	},
	"gemini-2-0-flash": {
		name: "Gemini 2.0 Flash",
		icon: "/images/model-icons/gemini-2.0-flash.svg",
	},
	"gemini-1-5-flash": {
		name: "Gemini 1.5 Flash",
		icon: "/images/model-icons/gemini-1.5-flash.svg",
	},
};

export default function ModelSelector() {
	const activeModel = useGlobalStore((state) => state.activeModel);
	const setActiveModel = useGlobalStore((state) => state.setActiveModel);
	const [isOpen, setIsOpen] = useState(false);

	const currentModel = models[activeModel];

	console.log(activeModel);
	console.log(currentModel);
	return (
		<div className="relative flex items-center justify-center">
			<div className="border flex flex-row">
				<Image
					src={currentModel.icon}
					alt={currentModel.name}
					width={24}
					height={24}
				/>
				<span>{currentModel.name}</span>
			</div>
			<div className="hidden">
				{Object.entries(models).map(([key, model]) => (
					<div key={key} onClick={() => setActiveModel(model)}>
						<Image
							src={model.icon}
							alt={model.name}
							width={32}
							height={32}
						/>
						<span>{model.name}</span>
					</div>
				))}
			</div>
		</div>
	);
}
