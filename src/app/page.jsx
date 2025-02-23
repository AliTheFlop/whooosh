'use client';

import { SearchIcon } from 'lucide-react';
import UserMessage from '@/components/UserMessage';
import { logout } from '@/app/actions';
import { useGlobalStore } from '@/store/zustand';
import { createClient } from '@/utils/supabase/client';
import { useEffect } from 'react';

export default function Home() {
    const supabase = createClient();

    const user = useGlobalStore((state) => state.user);
    const setUser = useGlobalStore((state) => state.setUser);

    useEffect(() => {
        async function initUser() {
            const { data } = await supabase.auth.getUser();

            if (data.user) {
                setUser(data.user);
            }
        }

        initUser();
    }, []);

    async function signOut() {
        const { data } = await supabase.auth.getUser();

        logout();

        if (data.user) {
            setUser(null);
        }
    }

    console.log(user);

    return (
        <div className="flex flex-row">
            {/**Sidebar */}
            <div className="h-screen overflow-hidden w-1/6 border-r border-stone-800">
                <div>
                    <h3>AI Chats</h3>
                </div>
                <button onClick={signOut}>Logout</button>
            </div>
            {/**Messages */}
            <div className="h-screen overflow-hidden w-5/6 flex flex-col justify-between">
                <div className="overflow-y-scroll h-full flex justify-center">
                    <div className="w-3/5">
                        {/**New chats go here */}
                        <UserMessage content="I wanna make a new golden stuff!" />
                    </div>
                </div>
                <div className="flex flex-row justify-center shadow-xl w-full rounded-xl pr-5 pb-5 pl-2">
                    <div className="relative w-3/5 shadow-xl rounded-xl">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <SearchIcon size={20} color="gray" />
                        </span>
                        <input
                            type="text"
                            className="border w-full rounded-xl h-14 pl-10"
                            placeholder="Let's get a chat going!"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
