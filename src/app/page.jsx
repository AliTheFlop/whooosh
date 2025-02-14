"use client";

import Group from "@/components/Group";
import { useEffect } from "react";
import useGlobalStore from "@/state/store";

export default function Home() {
    const newMessage = useGlobalStore((state) => state.newMessage);
    const setSocket = useGlobalStore((state) => state.setSocket);
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:2372");

        ws.onopen = () => {
            console.log("Connected to WebSocket");
        };

        ws.onmessage = (message) => {
            const data = JSON.parse(message.data);
            switch (data.type) {
                case "message":
                    newMessage(data);
                default:
                    return;
            }
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, []);

    return (
        <div>
            <Group groupid={54} />
        </div>
    );
}
