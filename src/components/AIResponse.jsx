"use client";

import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

import "prismjs/components/prism-core";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-clike";

// Specific language support
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx"; // Add this for JSX support
import "prismjs/components/prism-python";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";

export default function AIResponse({ content }) {
	useEffect(() => {
		Prism.highlightAll();
	});

	return (
		<div className="my-4">
			<div className="rounded-2xl bg-white px-4 py-3">
				<div
					className="markdown-body"
					dangerouslySetInnerHTML={{ __html: content }}
				/>
			</div>
		</div>
	);
}
