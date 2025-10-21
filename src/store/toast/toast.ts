import { create } from "zustand";

export interface ToastData {
  id: string;
  message: string;
  description?: string;
  type: "success" | "error" | "info";
}

interface ToastState {
  toasts: ToastData[];
  showToast: (message: string, description?: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  showToast: (message, description, type = "success") => {
    const id = Math.random().toString(36).substring(7);
    const newToast: ToastData = { id, message, description, type };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    // Auto remove after 3.5 seconds
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, 3500);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },

  clearAll: () => set({ toasts: [] }),
}));