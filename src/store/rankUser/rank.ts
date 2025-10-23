import { create } from "zustand";
import api from "@/utils/api";

// Toast utility type
interface ToastStore {
  showToast: (title: string, message: string, type: "success" | "error" | "info") => void;
}

// User interface based on API response
export interface RankUser {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  role?: string;
  isActive?: boolean;
  createdAt: string;
  updatedAt?: string;
  totalProblemsSolved: number;
  totalScore: number;
  platformsCount: number;
  externalProfiles: Array<{
    _id?: string;
    userId?: string;
    platform: string;
    username: string;
    profileUrl?: string;
    isVerified?: boolean;
    status?: string;
    lastChecked?: string;
    profileData?: {
      profile?: {
        username: string;
        realName?: string;
        aboutMe?: string;
        country?: string;
        company?: string;
        school?: string;
        ranking?: number;
        skillTags?: string[];
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
      recentActivity?: {
        last7Days?: {
          problemsSolved: number;
          problems: Array<{
            title: string;
            titleSlug: string;
            solvedAt: string;
            language: string;
            url: string;
          }>;
          languages: string[];
        };
      };
    };
  }>;
}

export interface RankOverviewResponse {
  success: boolean;
  ranks: RankUser[];
  topUsers: RankUser[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: {
    search: string;
    platform: string;
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
}

interface RankAnalysisState {
  users: RankUser[];
  topUsers: RankUser[];
  selectedUser: RankUser | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalUsers: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: {
    search: string;
    platform: string;
    country: string;
    availability: string;
    verification: string;
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setSearch: (search: string) => void;
  setPlatform: (platform: string) => void;
  setCountry: (country: string) => void;
  setAvailability: (availability: string) => void;
  setVerification: (verification: string) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (sortOrder: "asc" | "desc") => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSelectedUser: (user: RankUser | null) => void;
  fetchRankings: () => Promise<void>;
  reset: () => void;
}

const initialFilters = {
  search: "",
  platform: "",
  country: "",
  availability: "all",
  verification: "all",
  sortBy: "totalScore",
  sortOrder: "desc" as "asc" | "desc",
};

const initialPagination = {
  currentPage: 1,
  totalPages: 1,
  totalUsers: 0,
  hasNext: false,
  hasPrev: false,
};

// Toast utility - simple implementation
const showToast = (title: string, message: string, type: "success" | "error" | "info") => {
  console.log(`[${type.toUpperCase()}] ${title}: ${message}`);
  // You can replace this with your actual toast implementation
  if (typeof window !== 'undefined') {
    // Simple alert for demo - replace with your toast library
    if (type === 'error') {
      alert(`${title}\n${message}`);
    }
  }
};

export const useRankAnalysisStore = create<RankAnalysisState>((set, get) => ({
  users: [],
  topUsers: [],
  selectedUser: null,
  pagination: initialPagination,
  filters: initialFilters,
  isLoading: false,
  error: null,

  setSearch: (search) => {
    set((state) => ({
      filters: { ...state.filters, search },
      pagination: { ...state.pagination, currentPage: 1 },
    }));
    get().fetchRankings();
  },

  setPlatform: (platform) => {
    set((state) => ({
      filters: { ...state.filters, platform },
      pagination: { ...state.pagination, currentPage: 1 },
    }));
    get().fetchRankings();
  },

  setCountry: (country) => {
    set((state) => ({
      filters: { ...state.filters, country },
      pagination: { ...state.pagination, currentPage: 1 },
    }));
    get().fetchRankings();
  },

  setAvailability: (availability) => {
    set((state) => ({
      filters: { ...state.filters, availability },
      pagination: { ...state.pagination, currentPage: 1 },
    }));
    get().fetchRankings();
  },

  setVerification: (verification) => {
    set((state) => ({
      filters: { ...state.filters, verification },
      pagination: { ...state.pagination, currentPage: 1 },
    }));
    get().fetchRankings();
  },

  setSortBy: (sortBy) => {
    set((state) => ({
      filters: { ...state.filters, sortBy },
    }));
    get().fetchRankings();
  },

  setSortOrder: (sortOrder) => {
    set((state) => ({
      filters: { ...state.filters, sortOrder },
    }));
    get().fetchRankings();
  },

  setPage: (page) => {
    set((state) => ({
      pagination: { ...state.pagination, currentPage: page },
    }));
    get().fetchRankings();
  },

  setLimit: (limit) => {
    set((state) => ({
      pagination: { ...state.pagination, currentPage: 1 },
    }));
    get().fetchRankings();
  },

  setSelectedUser: (user) => set({ selectedUser: user }),

  fetchRankings: async () => {
    const { filters, pagination } = get();

    set({ isLoading: true, error: null });

    try {
      // Build query parameters
      const params = new URLSearchParams({
        page: pagination.currentPage.toString(),
        limit: "20",
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      });

      // Add optional filters
      if (filters.search) params.append("search", filters.search);
      if (filters.platform) params.append("platform", filters.platform);
      if (filters.country) params.append("country", filters.country);

      const response = await api.get<RankOverviewResponse>(
        `/ranks/overview?${params.toString()}`
      );

      const { ranks, topUsers, pagination: paginationData } = response.data;

      console.log("jii ",ranks);

      set({
        users: ranks || [],
        topUsers: topUsers || [],
        pagination: {
          currentPage: paginationData.currentPage,
          totalPages: paginationData.totalPages,
          totalUsers: paginationData.totalUsers,
          hasNext: paginationData.hasNext,
          hasPrev: paginationData.hasPrev,
        },
        isLoading: false,
        error: null,
      });

      // Show success toast only for search/filter actions
      if (filters.search || filters.platform) {
        showToast(
          "Rankings Updated",
          `Found ${paginationData.totalUsers} developer${paginationData.totalUsers !== 1 ? "s" : ""}`,
          "success"
        );
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to fetch rankings";

      set({
        error: errorMessage,
        isLoading: false,
        users: [],
        topUsers: [],
      });

      showToast("Failed to Load Rankings", errorMessage, "error");
    }
  },

  reset: () =>
    set({
      users: [],
      topUsers: [],
      selectedUser: null,
      pagination: initialPagination,
      filters: initialFilters,
      isLoading: false,
      error: null,
    }),
}));