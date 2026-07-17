import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.108:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Har request ke sath automatically token attach karega (agar localStorage me hai)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
