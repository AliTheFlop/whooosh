export default function Message({ content, username, profile }) {
    return (
        <div className="flex items-start w-full hover:bg-white/5 rounded-lg p-3 transition-colors">
            <img
                src={profile}
                alt="Profile"
                className="w-8 h-8 rounded-full mr-3 border-2 border-primary/30"
            />
            <div>
                <a
                    href="#"
                    className="block text-text-primary font-medium hover:text-accent transition-colors"
                >
                    {username}
                </a>
                <p className="text-text-secondary">{content}</p>
            </div>
        </div>
    );
}
