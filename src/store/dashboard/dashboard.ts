import { create } from "zustand";
import api from "@/utils/api";
import { useToastStore } from "@/utils/toast/store";

interface User {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
    bio: string;
    joinedAt: string;
}

interface Stats {
    totalProblemsSolved: number;
    totalScore: number;
    globalRank: number;
    platformsConnected: number;
    profileCompleteness: number;
}

interface PlatformStat {
    platform: string;
    username: string;
    problemsSolved: number;
    score: number;
    lastUpdated: string;
    hasData: boolean;
}

interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    earnedAt: string;
}

interface Activity {
    type: string;
    message: string;
    time: string;
    platform?: string;
}

interface DashboardData {
    user: User | null;
    stats: Stats | null;
    platformStats: PlatformStat[];
    recentActivity: Activity[];
    achievements: Achievement[];
}

interface Platform {
    name: string;
    displayName: string;
    urlTemplate: string;
    supportsAutoVerification: boolean;
}

interface ProfileData {
    profile?: {
        username: string;
        realName: string;
        aboutMe: string;
        country: string;
        company: string;
        school: string;
        ranking: number;
        skillTags: string[];
    };
    stats?: {
        total_solved: number;
        easy_solved: number;
        medium_solved: number;
        hard_solved: number;
        acceptance_rate: number;
    };
    submissions?: {
        easy: { solved: number; total: number };
        medium: { solved: number; total: number };
        hard: { solved: number; total: number };
    };
    badges?: Array<{
        id: string;
        displayName: string;
        icon: string;
        creationDate: string;
    }>;
}

interface ExternalProfile {
    _id: string;
    userId: string;
    platform: string;
    username: string;
    profileUrl: string;
    isVerified: boolean;
    status: string;
    verificationExpiresAt: string;
    verificationCode: string;
    createdAt: string;
    updatedAt: string;
    lastChecked?: string;
    profileData?: ProfileData;
}

interface DashboardState {
    // Data
    dashboardData: DashboardData;
    platforms: Platform[];
    externalProfiles: ExternalProfile[];
    
    // Loading states
    isDashboardLoading: boolean;
    isPlatformsLoading: boolean;
    isProfilesLoading: boolean;
    
    // Error states
    dashboardError: string | null;
    platformsError: string | null;
    profilesError: string | null;
    
    // Actions
    fetchDashboardStats: () => Promise<void>;
    fetchPlatforms: () => Promise<void>;
    fetchExternalProfiles: () => Promise<void>;
    fetchAllData: () => Promise<void>;
    reset: () => void;
}

const initialDashboardData: DashboardData = {
    user: null,
    stats: null,
    platformStats: [],
    recentActivity: [],
    achievements: [],
};

export const useDashboardStore = create<DashboardState>((set, get) => ({
    // Initial state
    dashboardData: initialDashboardData,
    platforms: [],
    externalProfiles: [],
    
    isDashboardLoading: false,
    isPlatformsLoading: false,
    isProfilesLoading: false,
    
    dashboardError: null,
    platformsError: null,
    profilesError: null,

    // Fetch Dashboard Stats
    fetchDashboardStats: async () => {
        const { showToast } = useToastStore.getState();
        set({ isDashboardLoading: true, dashboardError: null });

        try {
            const response = await api.get("/dashboard/stats");
            
            if (response.data.success) {
                set({
                    dashboardData: response.data.dashboard,
                    isDashboardLoading: false,
                });
                // showToast("Dashboard Loaded", "Successfully loaded dashboard statistics", "success");
            } else {
                throw new Error("Failed to load dashboard data");
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || err.response?.data?.message || "Failed to load dashboard";
            set({ dashboardError: errorMessage, isDashboardLoading: false });
            showToast("Dashboard Error", errorMessage, "error");
        }
    },

    // Fetch Available Platforms
    fetchPlatforms: async () => {
        const { showToast } = useToastStore.getState();
        set({ isPlatformsLoading: true, platformsError: null });

        try {
            const response = await api.get("/external-profiles/platforms");
            
            if (response.data.success) {
                set({
                    platforms: response.data.platforms,
                    isPlatformsLoading: false,
                });
            } else {
                throw new Error("Failed to load platforms");
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || err.response?.data?.message || "Failed to load platforms";
            set({ platformsError: errorMessage, isPlatformsLoading: false });
            showToast("Platforms Error", errorMessage, "error");
        }
    },

    // Fetch External Profiles
    fetchExternalProfiles: async () => {
        const { showToast } = useToastStore.getState();
        set({ isProfilesLoading: true, profilesError: null });

        try {
            const response = await api.get("/external-profiles");
            
            if (response.data.success) {
                set({
                    externalProfiles: response.data.profiles,
                    isProfilesLoading: false,
                });
                showToast("Profiles Loaded", `Loaded ${response.data.profiles.length} connected profiles`, "success");
            } else {
                throw new Error("Failed to load external profiles");
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || err.response?.data?.message || "Failed to load profiles";
            set({ profilesError: errorMessage, isProfilesLoading: false });
            showToast("Profiles Error", errorMessage, "error");
        }
    },

    // Fetch all data at once
    fetchAllData: async () => {
        const { fetchDashboardStats, fetchPlatforms, fetchExternalProfiles } = get();
        await Promise.all([
            fetchDashboardStats(),
            fetchPlatforms(),
            fetchExternalProfiles(),
        ]);
    },

    // Reset store
    reset: () => set({
        dashboardData: initialDashboardData,
        platforms: [],
        externalProfiles: [],
        isDashboardLoading: false,
        isPlatformsLoading: false,
        isProfilesLoading: false,
        dashboardError: null,
        platformsError: null,
        profilesError: null,
    }),
}));