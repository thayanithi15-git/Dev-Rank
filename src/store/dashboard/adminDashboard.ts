import { create } from "zustand";
import api from "@/utils/api";
import { useToastStore } from "@/utils/toast/store";

interface User {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
}

interface HelpRequest {
  _id: string;
  userId: {
    _id: string;
    username: string;
  };
  subject: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "resolved";
  createdAt: string;
}

interface UserStats {
  total: number;
  active: number;
  admins: number;
  inactive: number;
}

interface ProfileStats {
  total: number;
  verified: number;
  unverified: number;
}

interface HelpRequestStats {
  total: number;
  pending: number;
  resolved: number;
}

interface Stats {
  users: UserStats;
  profiles: ProfileStats;
  helpRequests: HelpRequestStats;
}

interface RecentActivity {
  users: User[];
  helpRequests: HelpRequest[];
}

interface AdminDashboardState {
  stats: Stats | null;
  recentActivity: RecentActivity | null;
  isLoading: boolean;
  error: string | null;
  lastFetched: Date | null;
  fetchDashboardStats: () => Promise<void>;
  refreshStats: () => Promise<void>;
  reset: () => void;
}

const initialState = {
  stats: null,
  recentActivity: null,
  isLoading: false,
  error: null,
  lastFetched: null,
};

export const useAdminDashboardStore = create<AdminDashboardState>(
  (set, get) => ({
    ...initialState,

    fetchDashboardStats: async () => {
      const { showToast } = useToastStore.getState();

      set({ isLoading: true, error: null });

      try {
        const response = await api.get("/users/admin/stats");

        if (response.data.success) {
          set({
            stats: response.data.stats,
            recentActivity: response.data.recentActivity,
            isLoading: false,
            error: null,
            lastFetched: new Date(),
          });

          showToast(
            "Dashboard Loaded",
            "Successfully loaded dashboard statistics",
            "success"
          );
        } else {
          throw new Error("Failed to fetch dashboard stats");
        }
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to load dashboard statistics";

        set({
          error: errorMessage,
          isLoading: false,
        });

        showToast("Error Loading Dashboard", errorMessage, "error");
      }
    },

    refreshStats: async () => {
      const { showToast } = useToastStore.getState();

      set({ isLoading: true });

      try {
        const response = await api.get("/users/admin/stats");

        if (response.data.success) {
          set({
            stats: response.data.stats,
            recentActivity: response.data.recentActivity,
            isLoading: false,
            error: null,
            lastFetched: new Date(),
          });

          showToast(
            "Dashboard Refreshed",
            "Statistics updated successfully",
            "success"
          );
        }
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to refresh dashboard";

        set({
          error: errorMessage,
          isLoading: false,
        });

        showToast("Refresh Failed", errorMessage, "error");
      }
    },

    reset: () => set(initialState),
  })
);