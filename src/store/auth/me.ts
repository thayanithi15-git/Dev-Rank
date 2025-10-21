import { create } from "zustand";
import api from "@/utils/api";
import { useToastStore } from "@/utils/toast/store";

interface User {
    id: string;
    username: string;
    email: string;
    role: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    isLoading: boolean;

    checkAuth: () => Promise<void>;
    fetchMe: () => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
    isLoading: false,

    checkAuth: async () => {
        const token = typeof window !== "undefined" && localStorage.getItem("token");
        
        if (!token) {
            set({ isAuthenticated: false, user: null });
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const isExpired = payload.exp * 1000 < Date.now();

            if (isExpired) {
                const { showToast } = useToastStore.getState();
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                localStorage.removeItem("username");
                localStorage.removeItem("userEmail");
                localStorage.removeItem("userRole");

                set({
                    isAuthenticated: false,
                    user: null,
                    token: null,
                });

                showToast("Session Expired", "Please log in again.", "error");
            } else {
                set({
                    isAuthenticated: true,
                    token,
                });
            }
        } catch (error) {
            console.error("Auth check error:", error);
            set({ isAuthenticated: false, user: null, token: null });
        }
    },

    fetchMe: async () => {
        const token = typeof window !== "undefined" && localStorage.getItem("token");
        
        if (!token) {
            return;
        }

        set({ isLoading: true });

        try {
            const response = await api.get("/auth/me");
            const { user } = response.data;

            set({
                user,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error: any) {
            console.error("Fetch me error:", error);
            const { showToast } = useToastStore.getState();
            
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                localStorage.removeItem("username");
                localStorage.removeItem("userEmail");
                localStorage.removeItem("userRole");

                set({
                    isAuthenticated: false,
                    user: null,
                    token: null,
                    isLoading: false,
                });

                showToast("Session Invalid", "Please log in again.", "error");
            } else {
                set({ isLoading: false });
            }
        }
    },

    logout: () => {
        const { showToast } = useToastStore.getState();
        
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userRole");

        set({
            user: null,
            token: null,
            isAuthenticated: false,
        });

        showToast("Logged Out", "You have been logged out successfully.", "success");
    },
}));

// Call checkAuth on app load
if (typeof window !== "undefined") {
    useAuthStore.getState().checkAuth();
}