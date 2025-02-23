export default function UserMessage({ content }) {
    return (
        <div className="rounded-2xl bg-stone-800 w-3/4 text-gray-300 justify-self-end px-4 py-4">
            {content}
        </div>
    );
}
