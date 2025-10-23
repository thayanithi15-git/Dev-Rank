import api from "@/utils/api";
import { useToastStore } from "@/utils/toast/store";
import { create } from "zustand";

// User interface
export interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  role: "user" | "admin";
  isActive: boolean;
  firstName?: string;
  lastName?: string;
  bio?: string;
  externalProfiles?: string[];
  createdAt: string;
  updatedAt: string;
}

// Pagination interface
interface Pagination {
  currentPage: string;
  totalPages: number;
  totalUsers: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// User Directory Store
interface UserDirectoryState {
  users: User[];
  selectedUser: User | null;
  pagination: Pagination | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    page: number;
    limit: number;
    search: string;
    role: string;
  };
  
  // Actions
  fetchUsers: () => Promise<void>;
  fetchUserById: (userId: string) => Promise<void>;
  updateUserStatus: (userId: string, isActive: boolean) => Promise<void>;
  updateUserRole: (userId: string, role: "user" | "admin") => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  setFilters: (filters: Partial<UserDirectoryState['filters']>) => void;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setRoleFilter: (role: string) => void;
  clearSelectedUser: () => void;
  reset: () => void;
}

export const useUserDirectoryStore = create<UserDirectoryState>((set, get) => ({
  users: [],
  selectedUser: null,
  pagination: null,
  isLoading: false,
  error: null,
  filters: {
    page: 1,
    limit: 10,
    search: "",
    role: ""
  },

  // Fetch all users
  fetchUsers: async () => {
    const { filters } = get();
    const { showToast } = useToastStore.getState();
    
    set({ isLoading: true, error: null });

    try {
      const queryParams = new URLSearchParams({
        page: filters.page.toString(),
        limit: filters.limit.toString(),
        search: filters.search,
        role: filters.role
      });

      const response = await api.get(`/users?${queryParams.toString()}`);
      const { users, pagination } = response.data;

      set({
        users,
        pagination,
        isLoading: false,
        error: null
      });

    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to fetch users";
      set({
        error: errorMessage,
        isLoading: false
      });
      showToast("Error", errorMessage, "error");
    }
  },

  // Fetch single user by ID
  fetchUserById: async (userId: string) => {
    const { showToast } = useToastStore.getState();
    
    set({ isLoading: true, error: null });

    try {
      const response = await api.get(`/users/${userId}`);
      const { user } = response.data;

      set({
        selectedUser: user,
        isLoading: false,
        error: null
      });

    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to fetch user details";
      set({
        error: errorMessage,
        isLoading: false
      });
      showToast("Error", errorMessage, "error");
    }
  },

  // Update user status (activate/deactivate)
  updateUserStatus: async (userId: string, isActive: boolean) => {
    const { showToast } = useToastStore.getState();
    
    set({ isLoading: true, error: null });

    try {
      const response = await api.patch(`/users/${userId}/status`, { isActive });
      const { user, message } = response.data;

      // Update user in the list
      set((state) => ({
        users: state.users.map((u) => 
          u._id === userId ? { ...u, isActive } : u
        ),
        selectedUser: state.selectedUser?._id === userId 
          ? { ...state.selectedUser, isActive } 
          : state.selectedUser,
        isLoading: false,
        error: null
      }));

      showToast(
        "Success", 
        message || `User ${isActive ? 'activated' : 'deactivated'} successfully`, 
        "success"
      );

    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to update user status";
      set({
        error: errorMessage,
        isLoading: false
      });
      showToast("Error", errorMessage, "error");
    }
  },

  // Update user role
  updateUserRole: async (userId: string, role: "user" | "admin") => {
    const { showToast } = useToastStore.getState();
    
    set({ isLoading: true, error: null });

    try {
      const response = await api.patch(`/users/${userId}/role`, { role });
      const { user, message } = response.data;

      // Update user in the list
      set((state) => ({
        users: state.users.map((u) => 
          u._id === userId ? { ...u, role } : u
        ),
        selectedUser: state.selectedUser?._id === userId 
          ? { ...state.selectedUser, role } 
          : state.selectedUser,
        isLoading: false,
        error: null
      }));

      showToast(
        "Success", 
        message || `User role updated to ${role} successfully`, 
        "success"
      );

    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to update user role";
      set({
        error: errorMessage,
        isLoading: false
      });
      showToast("Error", errorMessage, "error");
    }
  },

  // Delete user
  deleteUser: async (userId: string) => {
    const { showToast } = useToastStore.getState();
    
    set({ isLoading: true, error: null });

    try {
      const response = await api.delete(`/users/${userId}`);
      const { message } = response.data;

      // Remove user from the list
      set((state) => ({
        users: state.users.filter((u) => u._id !== userId),
        selectedUser: state.selectedUser?._id === userId ? null : state.selectedUser,
        isLoading: false,
        error: null
      }));

      showToast("Success", message || "User deleted successfully", "success");

      // Refresh the list
      get().fetchUsers();

    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to delete user";
      set({
        error: errorMessage,
        isLoading: false
      });
      showToast("Error", errorMessage, "error");
    }
  },

  // Set filters
  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters }
    }));
    get().fetchUsers();
  },

  // Set page
  setPage: (page) => {
    set((state) => ({
      filters: { ...state.filters, page }
    }));
    get().fetchUsers();
  },

  // Set search
  setSearch: (search) => {
    set((state) => ({
      filters: { ...state.filters, search, page: 1 }
    }));
    // Debounce would be ideal here in production
    get().fetchUsers();
  },

  // Set role filter
  setRoleFilter: (role) => {
    set((state) => ({
      filters: { ...state.filters, role, page: 1 }
    }));
    get().fetchUsers();
  },

  // Clear selected user
  clearSelectedUser: () => {
    set({ selectedUser: null });
  },

  // Reset store
  reset: () => {
    set({
      users: [],
      selectedUser: null,
      pagination: null,
      isLoading: false,
      error: null,
      filters: {
        page: 1,
        limit: 10,
        search: "",
        role: ""
      }
    });
  }
}));