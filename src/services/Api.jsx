// src/services/Api.jsx
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.228:8000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Attacher automatiquement le token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Si le token est invalide → déconnexion forcée
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/connexion";
    }
    return Promise.reject(error);
  }
);

export default api;
