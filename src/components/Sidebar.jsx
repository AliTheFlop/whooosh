"use client";

import SidebarChat from "@/components/SidebarChat";

export default function Sidebar() {
    return (
        <div className="min-h-screen py-5 bg-black/40 backdrop-blur-md border-r border-white/10">
            <div className="pb-5">
                <h1
                    className="text-xl font-medium tracking-tighter text-start pl-5 
                       bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"
                >
                    Your Chats
                </h1>
            </div>
            <div>
                <ul className="mt-5 ">
                    <SidebarChat name="John Smith Has A Gun" />
                </ul>
            </div>
        </div>
    );
}
