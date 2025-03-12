export default function UserMessage({ content }) {
	return (
		<div
			className="rounded-2xl w-3/4 justify-self-end my-4  bg-blue-100 border border-blue-200 px-4 py-3 max-w-3/4 text-gray-800 shadow-sm"
			style={{ whiteSpace: "pre-wrap" }}
		>
			{content}
		</div>
	);
}
