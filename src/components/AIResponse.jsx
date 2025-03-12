"use client";

import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-clike"; // Import core language definitions
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-java";
import "prismjs/components/prism-json";
import "prismjs/components/prism-json5";
import "prismjs/components/prism-jsonp";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-php";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-plsql";
import "prismjs/components/prism-python";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/toolbar/prism-toolbar.css";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";

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
