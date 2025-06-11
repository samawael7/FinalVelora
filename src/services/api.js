import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7182", // Your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for auth token if needed
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
