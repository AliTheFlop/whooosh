'use client';

import { SearchIcon } from 'lucide-react';
import useGlobalStore from '@/store/zustand';
import { useSession } from 'next-auth/react';
import Sidebar from '@/components/Sidebar';
import Chat from '@/components/Chat';
import { useRef } from 'react';
import { v4 } from 'uuid';
import { useEffect } from 'react';
import Spinner from '@/components/Spinner';

export default function Home() {
    const setUser = useGlobalStore((state) => state.setUser);
    const newMessage = useGlobalStore((state) => state.newMessage);
    const isAnswering = useGlobalStore((state) => state.isAnswering);
    const setIsAnswering = useGlobalStore((state) => state.setIsAnswering);
    const inputRef = useRef();

    const { data: session, status } = useSession();

    useEffect(() => {
        if (session) {
            setUser(session.user);
        }
    }, [session, setUser]);

    function handleNewMessage() {
        const messageContent = inputRef.current.value;

        if (!messageContent || isAnswering) return;

        const messageData = {
            content: messageContent,
            id: v4(),
        };

        newMessage(messageData);

        setIsAnswering(true);
        inputRef.current.value = '';

        setTimeout(() => {
            setIsAnswering(false);
        }, '2000');
    }

    return (
        <div className="flex min-h-screen max-h-screen bg-white">
            <Sidebar />

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                    <Chat chatid={54} />
                </div>

                {/* Input */}
                <div className="border-t border-gray-100 p-4">
                    <div className="max-w-3xl mx-auto relative flex flex-row items-center">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2">
                            <SearchIcon size={20} className="text-gray-400" />
                        </span>
                        <input
                            type="text"
                            className="w-5/6 h-12 pl-12 rounded-lg
                                bg-gray-50
                                border border-gray-200
                                text-gray-800
                                placeholder-gray-400
                                focus:border-blue-500
                                focus:ring-1 focus:ring-blue-500
                                focus:outline-none
                                transition-colors"
                            placeholder="Let's get a chat going!"
                            ref={inputRef}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleNewMessage();
                                }
                            }}
                        />
                        {isAnswering && <Spinner />}
                    </div>
                </div>
            </div>
        </div>
    );
}
