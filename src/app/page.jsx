export default function Home() {
    return (
        <div className="flex flex-row">
            {/**Sidebar */}
            <div className="h-screen overflow-hidden w-1/6 border-r border-stone-800">
                <div>
                    <h3>AI Chats</h3>
                </div>
            </div>
            <div className="h-screen overflow-hidden w-5/6">
                <div>
                    <p>This is a message</p>
                </div>
                <div>
                    <input type="text" />
                </div>
            </div>
        </div>
    );
}
