import { create } from "zustand";
import api from "@/utils/api";
import { useToastStore } from "@/utils/toast/store";

interface User {
    id: string;
    username: string;
    email: string;
    role: string;
}

interface SignUpState {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeTerms: boolean;
    isLoading: boolean;
    error: string | null;
    user: User | null;
    token: string | null;

    setUsername: (username: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setConfirmPassword: (confirmPassword: string) => void;
    setAgreeTerms: (agree: boolean) => void;
    signUp: () => Promise<boolean>;
    reset: () => void;
}

export const useSignUpStore = create<SignUpState>((set, get) => ({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    isLoading: false,
    error: null,
    user: null,
    token: null,

    setUsername: (username) => set({ username }),
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
    setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
    setAgreeTerms: (agree) => set({ agreeTerms: agree }),

    signUp: async () => {
        const { username, email, password, confirmPassword, agreeTerms } = get();
        const { showToast } = useToastStore.getState();

        // Validation
        if (!username || !email || !password || !confirmPassword) {
            showToast("Missing Information", "Please fill in all fields to create an account.", "error");
            return false;
        }

        if (password !== confirmPassword) {
            showToast("Password Mismatch", "Passwords do not match. Please try again.", "error");
            return false;
        }

        if (password.length < 6) {
            showToast("Weak Password", "Password must be at least 6 characters long.", "error");
            return false;
        }

        if (!agreeTerms) {
            showToast("Terms Required", "Please agree to the Terms & Conditions.", "error");
            return false;
        }

        set({ isLoading: true, error: null });

        try {
            const response = await api.post("/auth/register", {
                username,
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

            showToast("Account Created! 🎉", `Welcome to Devrank, ${user.username}!`, "success");
            return true;
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || err.response?.data?.message || "Failed to create account";
            set({ error: errorMessage, isLoading: false });
            showToast("Sign Up Failed", errorMessage, "error");
            return false;
        }
    },

    reset: () => set({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
        isLoading: false,
        error: null,
    }),
}));