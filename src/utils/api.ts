import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Token expired or invalid
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
      
//       // Redirect to login if not already there
//       if (typeof window !== "undefined" && window.location.pathname !== "/auth") {
//         window.location.href = "/";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default api;