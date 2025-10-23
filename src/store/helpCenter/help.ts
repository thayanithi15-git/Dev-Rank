import { create } from "zustand";
import api from "@/utils/api";
import { useToastStore } from "@/utils/toast/store";

interface HelpRequest {
  _id: string;
  userId?: string;
  subject: string;
  message: string;
  category: string;
  priority: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalRequests: number;
  hasNext: boolean;
  hasPrev: boolean;
}

interface HelpCenterState {
  // Form state
  subject: string;
  message: string;
  category: string;
  priority: string;
  
  // UI state
  isSubmitting: boolean;
  isLoadingRequests: boolean;
  isLoadingDetails: boolean;
  error: string | null;
  
  // Data state
  helpRequests: HelpRequest[];
  currentRequest: HelpRequest | null;
  pagination: Pagination | null;
  
  // Filters
  statusFilter: string;
  currentPage: number;
  limit: number;
  
  // Actions - Form
  setSubject: (subject: string) => void;
  setMessage: (message: string) => void;
  setCategory: (category: string) => void;
  setPriority: (priority: string) => void;
  
  // Actions - API
  submitHelpRequest: () => Promise<boolean>;
  fetchHelpRequests: (page?: number, status?: string) => Promise<void>;
  fetchHelpRequestDetails: (requestId: string) => Promise<void>;
  
  // Actions - Filters
  setStatusFilter: (status: string) => void;
  setCurrentPage: (page: number) => void;
  
  // Actions - Reset
  resetForm: () => void;
  reset: () => void;
}

export const useHelpCenterStore = create<HelpCenterState>((set, get) => ({
  // Initial form state
  subject: "",
  message: "",
  category: "technical",
  priority: "medium",
  
  // Initial UI state
  isSubmitting: false,
  isLoadingRequests: false,
  isLoadingDetails: false,
  error: null,
  
  // Initial data state
  helpRequests: [],
  currentRequest: null,
  pagination: null,
  
  // Initial filter state
  statusFilter: "all",
  currentPage: 1,
  limit: 10,
  
  // Form setters
  setSubject: (subject) => set({ subject }),
  setMessage: (message) => set({ message }),
  setCategory: (category) => set({ category }),
  setPriority: (priority) => set({ priority }),
  
  // Submit help request
  submitHelpRequest: async () => {
    const { subject, message, category, priority } = get();
    const { showToast } = useToastStore.getState();
    
    // Validation
    if (!subject.trim()) {
      showToast("Missing Information", "Please provide a subject for your help request.", "error");
      return false;
    }
    
    if (!message.trim()) {
      showToast("Missing Information", "Please describe your issue in detail.", "error");
      return false;
    }
    
    if (subject.length < 10) {
      showToast("Invalid Subject", "Subject must be at least 10 characters long.", "error");
      return false;
    }
    
    if (message.length < 20) {
      showToast("Invalid Message", "Message must be at least 20 characters long.", "error");
      return false;
    }
    
    set({ isSubmitting: true, error: null });
    
    try {
      const response = await api.post("/help", {
        subject: subject.trim(),
        message: message.trim(),
        category,
        priority
      });
      
      const { helpRequest } = response.data;
      
      set({
        isSubmitting: false,
        error: null,
        subject: "",
        message: "",
        category: "technical",
        priority: "medium"
      });
      
      showToast(
        "Request Submitted Successfully",
        `Your help request has been created with ID: ${helpRequest._id}. Our team will review it shortly.`,
        "success"
      );
      
      // Refresh the requests list
      get().fetchHelpRequests();
      
      return true;
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to submit help request. Please try again.";
      
      set({ error: errorMessage, isSubmitting: false });
      showToast("Submission Failed", errorMessage, "error");
      return false;
    }
  },
  
  // Fetch help requests
  fetchHelpRequests: async (page?: number, status?: string) => {
    const currentPage = page ?? get().currentPage;
    const statusFilter = status ?? get().statusFilter;
    const { limit } = get();
    const { showToast } = useToastStore.getState();
    
    set({ isLoadingRequests: true, error: null });
    
    try {
      const statusParam = statusFilter !== "all" ? `&status=${statusFilter}` : "";
      const response = await api.get(`/help?page=${currentPage}&limit=${limit}${statusParam}`);
      
      const { helpRequests, pagination } = response.data;
      
      set({
        helpRequests,
        pagination,
        currentPage,
        statusFilter,
        isLoadingRequests: false,
        error: null
      });
      
      if (helpRequests.length === 0 && currentPage === 1) {
        showToast(
          "No Requests Found",
          statusFilter === "all" 
            ? "You haven't submitted any help requests yet." 
            : `No ${statusFilter} requests found.`,
          "info"
        );
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to load help requests.";
      
      set({ error: errorMessage, isLoadingRequests: false, helpRequests: [] });
      showToast("Loading Failed", errorMessage, "error");
    }
  },
  
  // Fetch help request details
  fetchHelpRequestDetails: async (requestId: string) => {
    const { showToast } = useToastStore.getState();
    
    if (!requestId) {
      showToast("Invalid Request", "Please provide a valid request ID.", "error");
      return;
    }
    
    set({ isLoadingDetails: true, error: null });
    
    try {
      const response = await api.get(`/help/${requestId}`);
      
      const { helpRequest } = response.data;
      
      set({
        currentRequest: helpRequest,
        isLoadingDetails: false,
        error: null
      });
      
      showToast(
        "Request Details Loaded",
        `Loaded details for request: ${helpRequest.subject}`,
        "success"
      );
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Failed to load request details.";
      
      set({ error: errorMessage, isLoadingDetails: false, currentRequest: null });
      showToast("Loading Failed", errorMessage, "error");
    }
  },
  
  // Set status filter
  setStatusFilter: (status) => {
    set({ statusFilter: status, currentPage: 1 });
    get().fetchHelpRequests(1, status);
  },
  
  // Set current page
  setCurrentPage: (page) => {
    set({ currentPage: page });
    get().fetchHelpRequests(page);
  },
  
  // Reset form only
  resetForm: () => set({
    subject: "",
    message: "",
    category: "technical",
    priority: "medium",
    error: null
  }),
  
  // Reset everything
  reset: () => set({
    subject: "",
    message: "",
    category: "technical",
    priority: "medium",
    isSubmitting: false,
    isLoadingRequests: false,
    isLoadingDetails: false,
    error: null,
    helpRequests: [],
    currentRequest: null,
    pagination: null,
    statusFilter: "all",
    currentPage: 1,
    limit: 10
  })
}));