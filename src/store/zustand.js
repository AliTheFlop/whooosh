import { create } from "zustand";

const useGlobalStore = create((set) => ({
    user: null,
}));
