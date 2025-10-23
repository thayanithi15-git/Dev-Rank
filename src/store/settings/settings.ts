import { create } from "zustand";
import api from "@/utils/api";
import { useToastStore } from "@/utils/toast/store";

interface Platform {
  platform: string;
  username: string;
  isVerified: boolean;
  profileUrl: string;
  lastChecked: string;
  hasData: boolean;
}

interface PlatformsData {
  success: boolean;
  connectedPlatforms: Platform[];
  availablePlatforms: string[];
  totalConnected: number;
  totalAvailable: number;
}

interface SettingsState {
  // Password Change
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  isChangingPassword: boolean;
  
  // Platforms
  platforms: PlatformsData | null;
  isLoadingPlatforms: boolean;
  
  // Data Export
  isExportingData: boolean;
  
  // Account Deletion
  deletePassword: string;
  deleteConfirmation: string;
  isDeletingAccount: boolean;
  
  // Actions
  setCurrentPassword: (password: string) => void;
  setNewPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  changePassword: () => Promise<boolean>;
  
  fetchPlatforms: () => Promise<void>;
  
  exportData: () => Promise<void>;
  
  setDeletePassword: (password: string) => void;
  setDeleteConfirmation: (confirmation: string) => void;
  deleteAccount: () => Promise<boolean>;
  
  reset: () => void;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  // Initial State
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  isChangingPassword: false,
  
  platforms: null,
  isLoadingPlatforms: false,
  
  isExportingData: false,
  
  deletePassword: "",
  deleteConfirmation: "",
  isDeletingAccount: false,
  
  // Setters
  setCurrentPassword: (password) => set({ currentPassword: password }),
  setNewPassword: (password) => set({ newPassword: password }),
  setConfirmPassword: (password) => set({ confirmPassword: password }),
  setDeletePassword: (password) => set({ deletePassword: password }),
  setDeleteConfirmation: (confirmation) => set({ deleteConfirmation: confirmation }),
  
  // Change Password
  changePassword: async () => {
    const { currentPassword, newPassword, confirmPassword } = get();
    const { showToast } = useToastStore.getState();
    
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast(
        "Missing Information",
        "Please fill in all password fields.",
        "error"
      );
      return false;
    }
    
    if (newPassword !== confirmPassword) {
      showToast(
        "Password Mismatch",
        "New password and confirmation do not match.",
        "error"
      );
      return false;
    }
    
    if (newPassword.length < 8) {
      showToast(
        "Weak Password",
        "Password must be at least 8 characters long.",
        "error"
      );
      return false;
    }
    
    set({ isChangingPassword: true });
    
    try {
      const response = await api.post("/settings/change-password", {
        currentPassword,
        newPassword,
      });
      
      if (response.data.success) {
        showToast(
          "Password Changed",
          "Your password has been updated successfully.",
          "success"
        );
        
        // Reset password fields
        set({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
          isChangingPassword: false,
        });
        
        return true;
      } else {
        throw new Error(response.data.error || "Failed to change password");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Failed to change password";
      
      showToast("Password Change Failed", errorMessage, "error");
      set({ isChangingPassword: false });
      return false;
    }
  },
  
  // Fetch Platforms
  fetchPlatforms: async () => {
    const { showToast } = useToastStore.getState();
    set({ isLoadingPlatforms: true });
    
    try {
      const response = await api.get("/settings/platforms");
      
      if (response.data.success) {
        set({
          platforms: response.data,
          isLoadingPlatforms: false,
        });
      } else {
        throw new Error("Failed to fetch platforms");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to load platforms";
      
      showToast("Loading Failed", errorMessage, "error");
      set({ isLoadingPlatforms: false });
    }
  },
  
  // Export Data
  exportData: async () => {
    const { showToast } = useToastStore.getState();
    set({ isExportingData: true });
    
    try {
      const response = await api.get("/settings/export-data", {
        responseType: "blob",
      });
      
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `devrank-data-export-${new Date().toISOString().split("T")[0]}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      showToast(
        "Export Successful",
        "Your data has been downloaded successfully.",
        "success"
      );
      
      set({ isExportingData: false });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to export data";
      
      showToast("Export Failed", errorMessage, "error");
      set({ isExportingData: false });
    }
  },
  
  // Delete Account
  deleteAccount: async () => {
    const { deletePassword, deleteConfirmation } = get();
    const { showToast } = useToastStore.getState();
    
    // Validation
    if (!deletePassword || !deleteConfirmation) {
      showToast(
        "Missing Information",
        "Please enter your password and type DELETE to confirm.",
        "error"
      );
      return false;
    }
    
    if (deleteConfirmation !== "DELETE") {
      showToast(
        "Invalid Confirmation",
        'Please type "DELETE" exactly to confirm account deletion.',
        "error"
      );
      return false;
    }
    
    set({ isDeletingAccount: true });
    
    try {
      const response = await api.delete("/settings/account", {
        data: {
          password: deletePassword,
          confirmation: deleteConfirmation,
        },
      });
      
      if (response.data.success) {
        showToast(
          "Account Deleted",
          "Your account has been permanently deleted.",
          "success"
        );
        
        // Clear all local storage
        localStorage.clear();
        
        // Redirect to home or login page
        window.location.href = "/";
        
        return true;
      } else {
        throw new Error(response.data.error || "Failed to delete account");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Failed to delete account";
      
      showToast("Account Deletion Failed", errorMessage, "error");
      set({ isDeletingAccount: false });
      return false;
    }
  },
  
  // Reset
  reset: () =>
    set({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      isChangingPassword: false,
      deletePassword: "",
      deleteConfirmation: "",
      isDeletingAccount: false,
    }),
}));