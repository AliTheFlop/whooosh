"use client";

import TipTap from "./TipTap";

export default function Input() {
	return (
		<div className="border-t border-gray-100 p-4">
			<div className="max-w-3xl mx-auto relative flex flex-col">
				<div className="flex flex-row items-center">
					<TipTap />
				</div>
			</div>
		</div>
	);
}

{
	/* <textarea
					className="mainTextInput w-5/6 min-h-20 h-auto max-x-36 pl-12 rounded-lg
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
						} else if (e.key === "Enter" && e.shiftKey) {
							setTextAreaHeight((prevHeight) => {
								const newHeight = Math.min(
									prevHeight + 16,
									120
								);
								return newHeight;
							});
						}
					}}
					style={{
						minHeight: `${textAreaHeight}px`,
						maxHeight: "120px",
					}}
				/> */
}
