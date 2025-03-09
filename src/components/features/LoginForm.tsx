"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Eye, EyeOff, ArrowLeft, User } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { ErrorDisplay } from "../../components/ui/error-display";

import AuthService from "../../services/auth.service";
import { useNavigate, useLocation } from "react-router-dom";
import SuccessLogo from "./SuccessLogo";
import LoadingSpinner from "./loading";

export default function LoginForm() {
  // State for form inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect parametrini olish
  const from = location.state?.from?.pathname || "/";

  // Agar foydalanuvchi allaqachon login qilgan bo'lsa, asosiy sahifaga yo'naltirish
  // useEffect(() => {
  //   console.log(AuthService.isAuthenticated() && AuthService.checkTokenExpiration());
  //   if (AuthService.isAuthenticated() && AuthService.checkTokenExpiration()) {
  //     navigate("/", { replace: true });
  //   }
  // }, [navigate]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error state
    setError(null);

    // Validate inputs
    if (!username.trim()) {
      setError("Iltiamos, login kiriting");
      return;
    }

    if (!password.trim()) {
      setError("Iltimos, parolni kiriting");
      return;
    }

    // Login process
    try {
      setIsSubmitting(true);

      // API call to login
      await AuthService.login({ username, password });

      // Redirect to dashboard or original requested page
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error("Login error:", err.response.data);

      // API xatolik xabarlarini ko'rsatish
      if (err.response?.data) {
        if (err.response.data.detail) {
          setError(err.response.data.detail);
        } else if (err.response.data.non_field_errors) {
          setError(err.response.data.non_field_errors[0]);
        } else if (err.response.status === 400) {
          setError("Login yoki parol noto'g'ri");
        } else {
          setError("Login muvaffaqiyatsiz. Iltimos, qayta urinib ko'ring.");
        }
      } else {
        setError("Server bilan bog'lanishda xatolik yuz berdi. Internet aloqangizni tekshiring.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-4 shadow-lg">
      <CardContent className="p-6">
        {/* Back button */}
        <button className="text-gray-500 hover:text-gray-700 transition-colors mb-8" onClick={() => navigate("/")} type="button">
          <ArrowLeft size={20} />
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <SuccessLogo />
        </div>

        {/* Welcome text */}
        <h1 className="text-2xl font-semibold text-center mb-8">Xush kelibsiz!</h1>

        {/* Login form */}
        <form onSubmit={handleSubmit}>
          {/* Error message */}
          {error && <ErrorDisplay message={error} onDismiss={() => setError(null)} />}

          {/* Username field */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Login
            </label>
            <div className="relative">
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Login kiriting"
                className="w-full p-3 border rounded-md pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <User size={18} />
              </div>
            </div>
          </div>

          {/* Password field */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="block text-gray-700">
                Parol
              </label>
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Parolni unutdingizmi?
              </a>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parolni kiriting"
                className="w-full p-3 border rounded-md pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition-colors" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <LoadingSpinner />
                Kirish...
              </>
            ) : (
              "Kirish"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
