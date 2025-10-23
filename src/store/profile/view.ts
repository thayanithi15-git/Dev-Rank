import { create } from "zustand";
import api from "@/utils/api";
import { useToastStore } from "@/utils/toast/store";

interface ExternalProfile {
  _id: string;
  platform?: string;
  username?: string;
}

interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  externalProfiles?: string[] | ExternalProfile[];
  bio?: string;
  firstName?: string;
  lastName?: string;
}

interface ProfileState {
  user: User | null;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  
  // Edit mode state
  isEditMode: boolean;
  editData: {
    firstName: string;
    lastName: string;
    bio: string;
    avatar: string;
  };
  
  // Avatar upload state
  isUploadingAvatar: boolean;
  
  // Actions
  fetchProfile: () => Promise<void>;
  updateProfile: () => Promise<boolean>;
  setEditMode: (mode: boolean) => void;
  setEditData: (data: Partial<ProfileState["editData"]>) => void;
  uploadAvatar: (file: File) => Promise<string | null>;
  reset: () => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  user: null,
  isLoading: false,
  isUpdating: false,
  error: null,
  isEditMode: false,
  editData: {
    firstName: "",
    lastName: "",
    bio: "",
    avatar: "",
  },
  isUploadingAvatar: false,

  fetchProfile: async () => {
    const { showToast } = useToastStore.getState();
    set({ isLoading: true, error: null });

    try {
      const response = await api.get("/users/profile");
      const { user } = response.data;

      set({
        user,
        isLoading: false,
        editData: {
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          bio: user.bio || "",
          avatar: user.avatar || "",
        },
      });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to fetch profile";
      
      set({ error: errorMessage, isLoading: false });
      showToast("Error", errorMessage, "error");
    }
  },

  updateProfile: async () => {
    const { editData, user } = get();
    const { showToast } = useToastStore.getState();

    if (!editData.firstName || !editData.lastName) {
      showToast(
        "Missing Information",
        "First name and last name are required",
        "error"
      );
      return false;
    }

    set({ isUpdating: true, error: null });

    try {
      const response = await api.put("/users/profile", {
        firstName: editData.firstName,
        lastName: editData.lastName,
        bio: editData.bio,
        avatar: editData.avatar,
      });

      const { user: updatedUser } = response.data;

      set({
        user: updatedUser,
        isUpdating: false,
        isEditMode: false,
        editData: {
          firstName: updatedUser.firstName || "",
          lastName: updatedUser.lastName || "",
          bio: updatedUser.bio || "",
          avatar: updatedUser.avatar || "",
        },
      });

      showToast(
        "Profile Updated",
        "Your profile has been updated successfully",
        "success"
      );
      return true;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to update profile";

      set({ error: errorMessage, isUpdating: false });
      showToast("Update Failed", errorMessage, "error");
      return false;
    }
  },

  uploadAvatar: async (file: File) => {
    const { showToast } = useToastStore.getState();

    // Validate file
    if (!file.type.startsWith("image/")) {
      showToast("Invalid File", "Please upload an image file", "error");
      return null;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast("File Too Large", "Image size must be less than 5MB", "error");
      return null;
    }

    set({ isUploadingAvatar: true });

    try {
      // Create FormData for Cloudinary upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary preset
      formData.append("cloud_name", "your_cloud_name"); // Replace with your Cloudinary cloud name

      // Upload to Cloudinary
      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", // Replace with your cloud name
        {
          method: "POST",
          body: formData,
        }
      );

      if (!cloudinaryResponse.ok) {
        throw new Error("Failed to upload image to Cloudinary");
      }

      const cloudinaryData = await cloudinaryResponse.json();
      const imageUrl = cloudinaryData.secure_url;

      // Update edit data with new avatar URL
      set((state) => ({
        editData: {
          ...state.editData,
          avatar: imageUrl,
        },
        isUploadingAvatar: false,
      }));

      showToast("Image Uploaded", "Avatar uploaded successfully", "success");
      return imageUrl;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to upload avatar";
      set({ isUploadingAvatar: false });
      showToast("Upload Failed", errorMessage, "error");
      return null;
    }
  },

  setEditMode: (mode: boolean) => {
    const { user } = get();
    if (!mode && user) {
      // Reset edit data when canceling
      set({
        isEditMode: mode,
        editData: {
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          bio: user.bio || "",
          avatar: user.avatar || "",
        },
      });
    } else {
      set({ isEditMode: mode });
    }
  },

  setEditData: (data: Partial<ProfileState["editData"]>) =>
    set((state) => ({
      editData: { ...state.editData, ...data },
    })),

  reset: () =>
    set({
      user: null,
      isLoading: false,
      isUpdating: false,
      error: null,
      isEditMode: false,
      editData: {
        firstName: "",
        lastName: "",
        bio: "",
        avatar: "",
      },
      isUploadingAvatar: false,
    }),
}));