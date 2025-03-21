import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Spinner from "@/components/Spinner";
import useGlobalStore from "@/store/zustand";
import { useState } from "react";
import ModelSelector from "./ModelSelector";

export default function TipTap() {
	const isAnswering = useGlobalStore((state) => state.isAnswering);
	const handleMessage = useGlobalStore((state) => state.handleMessage);
	const [messageContent, setMessageContent] = useState("");

	function sendMessage(content) {
		if (content) {
			handleMessage(content);
			editor.commands.clearContent();
			editor.commands.focus();
		}
	}

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

	function handleButtonSubmit() {
		const text = editor.getText().trim();

		if (text) {
			try {
				sendMessage(text);
			} catch (err) {
				console.error(err);
			}
		}
	}
	const handleKeyDown = (e) => {
		if (!editor) return;

		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			const text = editor.getText().trim();
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
		<>
			<div
				className="mainTextInput overflow-y-scroll scrollbar-hide flex flex-row justify-between items-center w-5/6 min-h-12 h-auto max-x-36 pl-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 focus-within:outline-none transition-colors  leading-tight py-3"
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
				<div className="flex flex-row w-full justify-between items-center overflow-y-scroll scrollbar-hide">
					<EditorContent
						editor={editor}
						className="w-5/6"
						onKeyDown={handleKeyDown}
					/>{" "}
				</div>
				<div>
					{isAnswering ? (
						<Spinner />
					) : (
						<button
							className="mr-4 p-1 rounded-full bg-blue-800 hover:bg-blue-600 text-white shadow-md transition-all duration-200 flex items-center justify-center"
							onClick={() => handleButtonSubmit()}
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

			<ModelSelector />
		</>
	);
}
