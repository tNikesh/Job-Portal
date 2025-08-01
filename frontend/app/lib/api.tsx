// /app/lib/api.ts

import axios from "axios";
import { toast } from "react-toastify";
import useAuthStore from "../store/authUserStore";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // your backend base URL
  withCredentials:false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      // Token expired or invalid → Logout and redirect
      const { logout } = useAuthStore.getState();
      logout();
      window.location.href = "/login";
      // Dispatch a global event
      // window.dispatchEvent(new CustomEvent("unauthorized-login"));
    } 
    else if (status === 403) {
      // Forbidden (No permission)
      toast.error("You are not authorized to access this resource.");
      window.location.href = "/unauthorized";
      // window.dispatchEvent(new CustomEvent("forbidden-access"));
    }

    return Promise.reject(error);
  }
);






export default api;
