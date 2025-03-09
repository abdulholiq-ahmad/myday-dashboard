import axios from "axios";

// API klientini yaratish
const api = axios.create({
  baseURL: "https://test.api.mydays.uz/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - har bir so'rovga token qo'shish
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

// Response interceptor - xatoliklarni qayta ishlash
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 401 xatolik bo'lsa (token eskirgan), foydalanuvchini login sahifasiga yo'naltirish
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
