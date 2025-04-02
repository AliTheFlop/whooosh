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
