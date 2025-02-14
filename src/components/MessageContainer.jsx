"use client";

import { useRef } from "react";
import Message from "@/components/Message";
import MessageInput from "@/components/MessageInput";
import useGlobalStore from "@/state/store";

export default function MessageContainer({ messages, groupid }) {
    const socket = useGlobalStore((state) => state.socket);
    const user = useGlobalStore((state) => state.user);
    const newMessage = useGlobalStore((state) => state.newMessage);
    const dummyDiv = useRef(null);

    function handleNewMessage(message) {
        if (!message.trim().length) return;

        const newMessageObj = {
            id: Math.floor(Math.random() * 1000),
            groupid: groupid,
            type: "message",
            content: message,
            username: user[0].username,
            profile: user[0].profile,
        };

        newMessage(newMessageObj);

        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(newMessageObj));
        }

        setTimeout(() => {
            dummyDiv.current.scrollIntoView({ behavior: "smooth" });
        }, 350);
    }

    return (
        <>
            <div className="flex flex-col overflow-scroll overflow-x-hidden  self-end h-screen items-start pl-10 pt-5 text-white w-full">
                {messages ? (
                    messages.map((message) => (
                        <Message
                            key={message.id}
                            content={message.content}
                            username={message.username}
                            profile={message.profile}
                        />
                    ))
                ) : (
                    <div>No messages</div>
                )}
                <div ref={dummyDiv} id="dummydiv"></div>
            </div>
            <MessageInput handleNewMessage={handleNewMessage} />
        </>
    );
}
