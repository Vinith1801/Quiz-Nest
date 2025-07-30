// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // no external origin
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

export default api;
