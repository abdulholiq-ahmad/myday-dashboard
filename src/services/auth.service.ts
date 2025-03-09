import api from "./api";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
    first_name?: string;
    last_name?: string;
    [key: string]: any;
  };
}

const AuthService = {
  // Login
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post("/api/v1/auth/login/", credentials);

    console.log(response.data.access);

    if (response.data.access) {
      localStorage.setItem("token", response.data.access);
      // localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    try {
      await api.post("/api/v1/auth/logout/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Lokal ma'lumotlarni tozalash
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  },

  // Joriy foydalanuvchi ma'lumotlarini olish
  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  // Foydalanuvchi autentifikatsiya qilinganligini tekshirish
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("token");
  },

  // Token muddati tugaganligini tekshirish
  checkTokenExpiration: (): boolean => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      // JWT token strukturasi: header.payload.signature
      const payload = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payload));

      // exp - token muddati tugash vaqti (Unix timestamp)
      if (decodedPayload.exp) {
        // Joriy vaqt token muddatidan kichik bo'lsa, token hali amal qiladi
        return Date.now() < decodedPayload.exp * 1000;
      }

      return true; // exp mavjud bo'lmasa, token muddati tugamagan deb hisoblaymiz
    } catch (error) {
      console.error("Token parsing error:", error);
      return false; // Xatolik yuz bersa, token yaroqsiz deb hisoblaymiz
    }
  },
};

export default AuthService;
