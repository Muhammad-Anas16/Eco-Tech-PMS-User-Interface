import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.108:5000/api",
  withCredentials: true, // JWT Cookie Backend ke sath
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
