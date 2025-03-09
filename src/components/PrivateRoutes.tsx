"use client";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import LoadingSpinner from "./features/loading";

interface PrivateRouteProps {
  allowedRoles?: string[];
}

export default function PrivateRoute({ allowedRoles }: PrivateRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = AuthService.isAuthenticated() && AuthService.checkTokenExpiration();
      setIsAuthenticated(authenticated);

      if (authenticated) {
        const user = AuthService.getCurrentUser();
        setCurrentUser(user);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Yuklash jarayonida
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Agar autentifikatsiya qilinmagan bo'lsa, login sahifasiga yo'naltirish
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Agar ruxsat berilgan rollar ko'rsatilgan bo'lsa va foydalanuvchi roli mos kelmasa
  if (allowedRoles && currentUser && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Agar autentifikatsiya qilingan va ruxsat berilgan bo'lsa, ichki routelarni ko'rsatish
  return <Outlet />;
}
