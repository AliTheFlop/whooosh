"use client";

import React, { useEffect, useState } from "react";
import { remark } from "remark";
import html from "remark-html";

async function markdownToHtml(markdown) {
	const result = await remark().use(html).process(markdown);
	return result.toString();
}

export default function AIResponse({ content }) {
	const [aiMessageHtml, setAiMessageHtml] = useState("");

	useEffect(() => {
		async function convertMarkdown() {
			const html = await markdownToHtml(content);
			setAiMessageHtml(html);
		}
		convertMarkdown();
	}, [content]);

	return (
		<div
			className="markdown-body"
			dangerouslySetInnerHTML={{ __html: aiMessageHtml }}
		/>
	);
}
