import { create } from "zustand";

const useGlobalStore = create((set, get) => ({
    user: [
        {
            id: 1,
            username: "FishSlayer27",
            profile: "https://randomuser.me/api/portraits/lego/1.jpg",
        },
        {
            id: 2,
            username: "That's Wack",
            profile: "https://randomuser.me/api/portraits/lego/2.jpg",
        },
    ],
    socket: null,
    messages: [],
    setSocket: (socket) => set({ socket: socket }),
    newMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
    getGroupMessages: (groupid) => {
        return get().messages.filter((message) => message.groupid === groupid);
    },
}));

export default useGlobalStore;
