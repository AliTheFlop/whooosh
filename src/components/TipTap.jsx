import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Spinner from "@/components/Spinner";
import useGlobalStore from "@/store/zustand";
import ModelSelector from "./ModelSelector";

export default function TipTap() {
	const isAnswering = useGlobalStore((state) => state.isAnswering);
	const handleMessage = useGlobalStore((state) => state.handleMessage);

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: false,
				codeBlock: false,
				blockquote: false,
				horizontalRule: false,
				table: false,
			}),
			Placeholder.configure({
				placeholder: "Type your message...",
			}),
		],
		content: "",
		autofocus: true,
	});

	function sendMessage() {
		if (!editor) return;
		const text = editor.getText().trim();
		if (text) {
			handleMessage(text);
			editor.commands.clearContent();
		}
	}

	const handleKeyDown = (e) => {
		if (!editor) return;
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	useEffect(() => {
		if (editor) {
			editor.commands.focus();
		}
	}, [editor]);

	return (
		<>
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
			<div className="w-full max-w-2xl mx-auto">
				<div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-visible">
					{/* Editor Content */}
					<div className="p-4 pb-0">
						<EditorContent
							editor={editor}
							onKeyDown={handleKeyDown}
							className="min-h-[50px] max-h-[200px] overflow-y-auto scrollbar-hide"
						/>
					</div>

					{/* Bottom Actions */}
					<div className="flex items-center justify-between p-4 border-t border-gray-200">
						<ModelSelector />

						<button
							onClick={sendMessage}
							disabled={isAnswering}
							className={`
                flex items-center justify-center 
                w-10 h-10 rounded-full 
                ${
					isAnswering
						? "bg-gray-200 cursor-not-allowed"
						: "bg-blue-600 hover:bg-blue-700 text-white"
				}
                transition-colors duration-200
              `}
						>
							{isAnswering ? (
								<Spinner />
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
