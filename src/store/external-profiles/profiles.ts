import { create } from "zustand";
import api from "@/utils/api";
import { useToastStore } from "@/utils/toast/store";

export interface Platform {
  name: string;
  displayName: string;
  urlTemplate: string;
  supportsAutoVerification: boolean;
}

export interface ExternalProfile {
  _id: string;
  userId?: string;
  platform: string;
  username: string;
  profileUrl: string;
  isVerified: boolean;
  status: "pending" | "verified" | "failed";
  verificationExpiresAt?: string;
  verificationCode?: string;
  createdAt: string;
  updatedAt: string;
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
      total_solved?: number;
      easy_solved?: number;
      medium_solved?: number;
      hard_solved?: number;
      acceptance_rate?: number;
    };
    submissions?: {
      easy?: { solved: number; total: number };
      medium?: { solved: number; total: number };
      hard?: { solved: number; total: number };
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
    lastFetched?: string;
    fetchStatus?: string;
  };
  hasData?: boolean;
}

interface ExternalProfilesState {
  platforms: Platform[];
  profiles: ExternalProfile[];
  selectedProfile: ExternalProfile | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchPlatforms: () => Promise<void>;
  fetchProfiles: () => Promise<void>;
  addProfile: (platform: string, username: string) => Promise<boolean>;
  updateProfile: (profileId: string, username: string) => Promise<boolean>;
  deleteProfile: (profileId: string) => Promise<boolean>;
  regenerateCode: (profileId: string) => Promise<boolean>;
  verifyProfile: (profileId: string) => Promise<boolean>;
  fetchProfileData: (profileId: string) => Promise<boolean>;
  fetchSingleProfileData: (profileId: string) => Promise<boolean>;
  fetchAllProfilesData: () => Promise<void>;
  setSelectedProfile: (profile: ExternalProfile | null) => void;
  reset: () => void;
}

export const useExternalProfilesStore = create<ExternalProfilesState>((set, get) => ({
  platforms: [],
  profiles: [],
  selectedProfile: null,
  isLoading: false,
  error: null,

  fetchPlatforms: async () => {
    const { showToast } = useToastStore.getState();
    set({ isLoading: true, error: null });

    try {
      const response = await api.get("/external-profiles/platforms");
      set({
        platforms: response.data.platforms,
        isLoading: false,
      });
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Failed to fetch platforms";
      set({ error: errorMessage, isLoading: false });
      showToast("Error", errorMessage, "error");
    }
  },

  fetchProfiles: async () => {
    const { showToast } = useToastStore.getState();
    set({ isLoading: true, error: null });

    try {
      const response = await api.get("/external-profiles");
      set({
        profiles: response.data.profiles || [],
        isLoading: false,
      });
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Failed to fetch profiles";
      set({ error: errorMessage, isLoading: false });
      showToast("Error", errorMessage, "error");
    }
  },

  addProfile: async (platform: string, username: string) => {
    const { showToast } = useToastStore.getState();
    set({ isLoading: true, error: null });

    try {
      const response = await api.post("/external-profiles", {
        platform,
        username,
      });

      if (response.data.success) {
        const newProfile = response.data.profile;
        set((state) => ({
          profiles: [...state.profiles, newProfile],
          isLoading: false,
        }));

        showToast(
          "Profile Added",
          response.data.message || `${platform} profile added successfully`,
          "success"
        );

        if (response.data.instructions) {
          showToast(
            "Verification Required",
            response.data.instructions,
            "info"
          );
        }

        return true;
      }
      return false;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Failed to add profile";
      set({ error: errorMessage, isLoading: false });
      showToast("Error", errorMessage, "error");
      return false;
    }
  },

  updateProfile: async (profileId: string, username: string) => {
    const { showToast } = useToastStore.getState();
    set({ isLoading: true, error: null });

    try {
      const response = await api.put(`/external-profiles/${profileId}`, {
        username,
      });

      if (response.data.success) {
        const updatedProfile = response.data.profile;
        set((state) => ({
          profiles: state.profiles.map((p) =>
            p._id === profileId ? updatedProfile : p
          ),
          isLoading: false,
        }));

        showToast(
          "Profile Updated",
          response.data.message || "Profile updated successfully",
          "success"
        );

        if (response.data.instructions) {
          showToast(
            "Re-verification Required",
            response.data.instructions,
            "info"
          );
        }

        return true;
      }
      return false;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Failed to update profile";
      set({ error: errorMessage, isLoading: false });
      showToast("Error", errorMessage, "error");
      return false;
    }
  },

  deleteProfile: async (profileId: string) => {
    const { showToast } = useToastStore.getState();
    set({ isLoading: true, error: null });

    try {
      const response = await api.delete(`/external-profiles/${profileId}`);

      if (response.data.success) {
        set((state) => ({
          profiles: state.profiles.filter((p) => p._id !== profileId),
          isLoading: false,
        }));

        showToast(
          "Profile Deleted",
          "Profile removed successfully",
          "success"
        );

        return true;
      }
      return false;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Failed to delete profile";
      set({ error: errorMessage, isLoading: false });
      showToast("Error", errorMessage, "error");
      return false;
    }
  },

  regenerateCode: async (profileId: string) => {
    const { showToast } = useToastStore.getState();
    set({ isLoading: true, error: null });

    try {
      const response = await api.post(
        `/external-profiles/${profileId}/regenerate-code`
      );

      if (response.data.success) {
        set((state) => ({
          profiles: state.profiles.map((p) =>
            p._id === profileId
              ? {
                  ...p,
                  verificationCode: response.data.verificationCode,
                  verificationExpiresAt: response.data.verificationExpiresAt,
                }
              : p
          ),
          isLoading: false,
        }));

        showToast(
          "Code Regenerated",
          response.data.message || "New verification code generated",
          "success"
        );

        if (response.data.instructions) {
          showToast(
            "Verification Instructions",
            response.data.instructions,
            "info"
          );
        }

        return true;
      }
      return false;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Failed to regenerate code";
      set({ error: errorMessage, isLoading: false });
      showToast("Error", errorMessage, "error");
      return false;
    }
  },

  verifyProfile: async (profileId: string) => {
    const { showToast } = useToastStore.getState();
    set({ isLoading: true, error: null });

    try {
      const response = await api.post(
        `/external-profiles/${profileId}/verify`
      );

      if (response.data.success) {
        set((state) => ({
          profiles: state.profiles.map((p) =>
            p._id === profileId
              ? { ...p, isVerified: true, status: "verified" }
              : p
          ),
          isLoading: false,
        }));

        showToast(
          "Profile Verified",
          "Your profile has been verified successfully!",
          "success"
        );

        return true;
      }
      return false;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Verification failed";
      const instructions = err.response?.data?.instructions;
      
      set({ error: errorMessage, isLoading: false });
      
      showToast("Verification Failed", errorMessage, "error");
      
      if (instructions) {
        showToast("Instructions", instructions, "info");
      }
      
      return false;
    }
  },

  fetchProfileData: async (profileId: string) => {
    const { showToast } = useToastStore.getState();
    set({ isLoading: true, error: null });

    try {
      const response = await api.get(`/external-profiles/${profileId}/data`);

      if (response.data.success) {
        const profileData = response.data.profile;
        set((state) => ({
          profiles: state.profiles.map((p) =>
            p._id === profileId ? { ...p, ...profileData } : p
          ),
          isLoading: false,
        }));

        return true;
      }
      return false;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Failed to fetch profile data";
      set({ error: errorMessage, isLoading: false });
      showToast("Error", errorMessage, "error");
      return false;
    }
  },

  fetchSingleProfileData: async (profileId: string) => {
    const { showToast } = useToastStore.getState();
    set({ isLoading: true, error: null });

    try {
      const response = await api.post(
        `/external-profiles/${profileId}/fetch-data`
      );

      if (response.data.success) {
        showToast(
          "Data Fetched",
          "Profile data updated successfully",
          "success"
        );

        // Refresh the profile data
        await get().fetchProfileData(profileId);
        return true;
      }
      return false;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Failed to fetch data";
      set({ error: errorMessage, isLoading: false });
      showToast("Error", errorMessage, "error");
      return false;
    }
  },

  fetchAllProfilesData: async () => {
    const { showToast } = useToastStore.getState();
    set({ isLoading: true, error: null });

    try {
      const response = await api.post("/external-profiles/fetch-all-data");

      if (response.data.success) {
        showToast(
          "Data Synced",
          response.data.message || "All profiles data updated",
          "success"
        );

        // Refresh all profiles
        await get().fetchProfiles();
      }
      set({ isLoading: false });
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Failed to sync data";
      set({ error: errorMessage, isLoading: false });
      showToast("Error", errorMessage, "error");
    }
  },

  setSelectedProfile: (profile) => set({ selectedProfile: profile }),

  reset: () =>
    set({
      platforms: [],
      profiles: [],
      selectedProfile: null,
      isLoading: false,
      error: null,
    }),
}));