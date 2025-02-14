export default function MessageInput({ handleNewMessage }) {
    function handleKeyDown(e) {
        if (e.key === "Enter") {
            handleNewMessage(e.target.value);
            e.target.value = "";
        }
    }

    return (
        <div className="w-full p-4 bg-black/30 backdrop-blur-sm border-t border-white/10">
            <input
                type="text"
                placeholder="Type a message"
                className="w-full h-12 rounded-lg bg-white/10 pl-5 pr-5 
                   focus:outline-none focus:ring-2 focus:ring-accent/50 
                   transition-all placeholder-white/30"
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}
