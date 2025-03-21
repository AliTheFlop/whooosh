import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

function TipTap({ sendMessage, setMessageContent }) {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				// Disable features to keep it simple like a textarea
				heading: false,
				codeBlock: false,
				blockquote: false,
				horizontalRule: false,
				table: false,
			}),
			Placeholder.configure({
				placeholder: "Let's get a chat going!",
			}),
		],
		content: "",
		autofocus: true,
		immediatelyRender: false,
	});

	const handleKeyDown = (e) => {
		if (!editor) return;

		const text = editor.getText().trim();

		if (text) {
			setMessageContent({ editor: editor, text: text });
		}

		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			try {
				if (text) {
					sendMessage(text);
				}
			} catch (error) {
				console.log(error);
				return `[Error 500] Something went wrong: ${error}`;
			}
		}
	};

	useEffect(() => {
		if (editor) {
			editor.commands.focus();
		}
	}, [editor]);

	return (
		<div
			className="mainTextInput w-5/6 min-h-12 h-auto max-x-36 pl-12 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 focus-within:outline-none transition-colors overflow-y-auto leading-tight py-3"
			style={{
				minHeight: "48px !important",
				maxHeight: "150px",
			}}
		>
			<style
				dangerouslySetInnerHTML={{
					__html: `

        .ProseMirror {
          min-height: 1.5rem;
          outline: none;
        }
        
        .ProseMirror p {
          margin: 0;
        }

        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af; /* Tailwind's gray-400 */
          pointer-events: none;
          height: 0;
        }
      `,
				}}
			/>

			<EditorContent editor={editor} onKeyDown={handleKeyDown} />
		</div>
	);
}

export default TipTap;
