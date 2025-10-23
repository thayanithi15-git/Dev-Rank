// store/admin/helpCenter.ts
import { create } from "zustand";
import api from "@/utils/api";
import { useToastStore } from "@/utils/toast/store";

interface User {
  _id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface HelpRequest {
  _id: string;
  userId: User;
  subject: string;
  message: string;
  category: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "pending" | "in-progress" | "resolved" | "closed";
  adminResponse?: string;
  respondedBy?: User | string;
  respondedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalRequests: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface AdminHelpCenterState {
  helpRequests: HelpRequest[];
  currentRequest: HelpRequest | null;
  pagination: Pagination | null;
  isLoading: boolean;
  isLoadingDetails: boolean;
  isSubmittingReply: boolean;
  isUpdatingStatus: boolean;
  isDeleting: boolean;
  error: string | null;
  
  // Filters
  statusFilter: string;
  currentPage: number;
  limit: number;
  searchTerm: string;
  
  // Reply form
  adminResponse: string;
  newStatus: string;
  
  // Actions
  fetchAllHelpRequests: () => Promise<void>;
  fetchHelpRequestDetails: (requestId: string) => Promise<void>;
  replyToHelpRequest: (requestId: string) => Promise<boolean>;
  updateHelpRequestStatus: (requestId: string, status: string) => Promise<boolean>;
  deleteHelpRequest: (requestId: string) => Promise<boolean>;
  
  // Setters
  setStatusFilter: (status: string) => void;
  setCurrentPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSearchTerm: (term: string) => void;
  setAdminResponse: (response: string) => void;
  setNewStatus: (status: string) => void;
  setCurrentRequest: (request: HelpRequest | null) => void;
  
  // Reset
  reset: () => void;
  resetReplyForm: () => void;
}

const initialState = {
  helpRequests: [],
  currentRequest: null,
  pagination: null,
  isLoading: false,
  isLoadingDetails: false,
  isSubmittingReply: false,
  isUpdatingStatus: false,
  isDeleting: false,
  error: null,
  statusFilter: "all",
  currentPage: 1,
  limit: 10,
  searchTerm: "",
  adminResponse: "",
  newStatus: "",
};

export const useAdminHelpCenterStore = create<AdminHelpCenterState>(
  (set, get) => ({
    ...initialState,

    fetchAllHelpRequests: async () => {
      const { showToast } = useToastStore.getState();
      const { currentPage, limit, statusFilter } = get();

      set({ isLoading: true, error: null });

      try {
        const params: any = {
          page: currentPage,
          limit: limit,
        };

        if (statusFilter && statusFilter !== "all") {
          params.status = statusFilter;
        }

        const response = await api.get("/help/admin/all", { params });

        if (response.data.success) {
          set({
            helpRequests: response.data.helpRequests,
            pagination: response.data.pagination,
            isLoading: false,
            error: null,
          });
        } else {
          throw new Error("Failed to fetch help requests");
        }
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to load help requests";

        set({
          error: errorMessage,
          isLoading: false,
        });

        showToast("Error Loading Requests", errorMessage, "error");
      }
    },

    fetchHelpRequestDetails: async (requestId: string) => {
      const { showToast } = useToastStore.getState();

      set({ isLoadingDetails: true, error: null });

      try {
        const response = await api.get(`/help/${requestId}`);

        if (response.data.success) {
          set({
            currentRequest: response.data.helpRequest,
            isLoadingDetails: false,
            error: null,
          });
        } else {
          throw new Error("Failed to fetch request details");
        }
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to load request details";

        set({
          error: errorMessage,
          isLoadingDetails: false,
        });

        showToast("Error Loading Details", errorMessage, "error");
      }
    },

    replyToHelpRequest: async (requestId: string) => {
      const { showToast } = useToastStore.getState();
      const { adminResponse, newStatus } = get();

      if (!adminResponse || adminResponse.trim().length < 10) {
        showToast(
          "Invalid Response",
          "Please provide a response with at least 10 characters",
          "error"
        );
        return false;
      }

      set({ isSubmittingReply: true, error: null });

      try {
        const payload: any = {
          adminResponse: adminResponse.trim(),
        };

        if (newStatus) {
          payload.status = newStatus;
        }

        const response = await api.post(`/help/${requestId}/reply`, payload);

        if (response.data.success) {
          set({
            currentRequest: response.data.helpRequest,
            isSubmittingReply: false,
            adminResponse: "",
            newStatus: "",
          });

          // Refresh the list
          get().fetchAllHelpRequests();

          showToast(
            "Reply Sent",
            "Your response has been sent successfully",
            "success"
          );

          return true;
        } else {
          throw new Error("Failed to send reply");
        }
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to send reply";

        set({
          error: errorMessage,
          isSubmittingReply: false,
        });

        showToast("Reply Failed", errorMessage, "error");
        return false;
      }
    },

    updateHelpRequestStatus: async (requestId: string, status: string) => {
      const { showToast } = useToastStore.getState();

      if (!status) {
        showToast("Invalid Status", "Please select a status", "error");
        return false;
      }

      set({ isUpdatingStatus: true, error: null });

      try {
        const response = await api.patch(`/help/${requestId}/status`, {
          status,
        });

        if (response.data.success) {
          set({
            currentRequest: response.data.helpRequest,
            isUpdatingStatus: false,
          });

          // Refresh the list
          get().fetchAllHelpRequests();

          showToast(
            "Status Updated",
            `Request status updated to ${status}`,
            "success"
          );

          return true;
        } else {
          throw new Error("Failed to update status");
        }
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to update status";

        set({
          error: errorMessage,
          isUpdatingStatus: false,
        });

        showToast("Update Failed", errorMessage, "error");
        return false;
      }
    },

    deleteHelpRequest: async (requestId: string) => {
      const { showToast } = useToastStore.getState();

      set({ isDeleting: true, error: null });

      try {
        const response = await api.delete(`/help/${requestId}`);

        if (response.data.success) {
          set({
            isDeleting: false,
            currentRequest: null,
          });

          // Remove from list
          set((state) => ({
            helpRequests: state.helpRequests.filter(
              (req) => req._id !== requestId
            ),
          }));

          // Refresh the list
          get().fetchAllHelpRequests();

          showToast(
            "Request Deleted",
            "Help request deleted successfully",
            "success"
          );

          return true;
        } else {
          throw new Error("Failed to delete request");
        }
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to delete request";

        set({
          error: errorMessage,
          isDeleting: false,
        });

        showToast("Delete Failed", errorMessage, "error");
        return false;
      }
    },

    setStatusFilter: (status: string) => {
      set({ statusFilter: status, currentPage: 1 });
      get().fetchAllHelpRequests();
    },

    setCurrentPage: (page: number) => {
      set({ currentPage: page });
      get().fetchAllHelpRequests();
    },

    setLimit: (limit: number) => {
      set({ limit, currentPage: 1 });
      get().fetchAllHelpRequests();
    },

    setSearchTerm: (term: string) => set({ searchTerm: term }),

    setAdminResponse: (response: string) => set({ adminResponse: response }),

    setNewStatus: (status: string) => set({ newStatus: status }),

    setCurrentRequest: (request: HelpRequest | null) =>
      set({ currentRequest: request }),

    reset: () => set(initialState),

    resetReplyForm: () => set({ adminResponse: "", newStatus: "" }),
  })
);