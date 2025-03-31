// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.228:8000/api", // URL de votre backend Laravel
  headers: {
    "Content-Type": "application/json",
  },
});

// Ajoutez un intercepteur pour inclure le token JWT dans chaque requête
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;