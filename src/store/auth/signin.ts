import { create } from "zustand";
import api from "@/utils/api";
import { useToastStore } from "@/utils/toast/store";

interface User {
    id: string;
    username: string;
    email: string;
    role: string;
}

interface SignInState {
    email: string;
    password: string;
    isLoading: boolean;
    error: string | null;
    user: User | null;
    token: string | null;

    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    signIn: () => Promise<boolean>;
    reset: () => void;
}

export const useSignInStore = create<SignInState>((set, get) => ({
    email: "",
    password: "",
    isLoading: false,
    error: null,
    user: null,
    token: null,

    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),

    signIn: async () => {
        const { email, password } = get();
        const { showToast } = useToastStore.getState();

        if (!email || !password) {
            showToast("Missing Information", "Please fill in all fields to sign in.", "error");
            return false;
        }

        set({ isLoading: true, error: null });

        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            const { user, token } = response.data;

            // Store in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("userId", user.id);
            localStorage.setItem("username", user.username);
            localStorage.setItem("userEmail", user.email);
            localStorage.setItem("userRole", user.role);

            set({
                user,
                token,
                isLoading: false,
                error: null,
            });

            showToast("Welcome Back!", `Signed in as ${user.username}`, "success");
            return true;
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || err.response?.data?.message || "Failed to sign in";
            set({ error: errorMessage, isLoading: false });
            showToast("Sign In Failed", errorMessage, "error");
            return false;
        }
    },

    reset: () => set({
        email: "",
        password: "",
        isLoading: false,
        error: null,
    }),
}));