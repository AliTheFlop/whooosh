"use client";

import useGlobalStore from "@/state/store.jsx";
import MessageContainer from "@/components/MessageContainer";

export default function Group({ groupid }) {
    const allMessages = useGlobalStore((state) => state.messages);
    const messages = allMessages.filter(
        (message) => message.groupid === groupid
    );

    return (
        <div className="flex flex-col h-screen w-full max-h-screen">
            <div
                className="h-14 p-6 bg-black/30 backdrop-blur-sm border-b border-white/10 
                flex items-center pl-20"
            >
                <img
                    src="https://randomuser.me/api/portraits/men/64.jpg"
                    alt="Profile"
                    className="w-8 h-8 rounded-full mr-3 border-2 border-accent/30"
                />
                <h1 className="font-medium text-text-primary">
                    John Smith has a gun.... run away
                </h1>
            </div>
            <MessageContainer messages={messages} groupid={groupid} />
        </div>
    );
}
