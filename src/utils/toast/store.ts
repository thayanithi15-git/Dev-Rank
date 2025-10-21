import { create } from "zustand";

interface ToastData {
    message: string;
    description?: string;
    type: "success" | "error" | "info";
}

interface ToastState {
    toast: ToastData | null;
    showToast: (message: string, description?: string, type?: "success" | "error" | "info") => void;
    hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
    toast: null,
    showToast: (message, description, type = "success") => {
        set({ toast: { message, description, type } });
        setTimeout(() => {
            set({ toast: null });
        }, 3500);
    },
    hideToast: () => set({ toast: null }),
}));