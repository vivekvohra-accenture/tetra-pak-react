// src/components/ProtectedRoute.tsx
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import type { Role } from "../types/users";

type Props = {
  children: ReactNode;
  allowedRoles?: Role[];   // ✅ NEW: array-based (matches menuConfig)
  requiredRole?: Role;     // ✅ keep old support if you want
};

export default function ProtectedRoute({ children, allowedRoles, requiredRole }: Props) {
  const { currentUser, isAuthenticated } = useAppSelector((state) => state.auth);

  // ✅ Fix: proper OR condition
  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Prefer allowedRoles if provided (because it's more flexible)
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/home" replace />;
  }

  // ✅ Fallback: single requiredRole
  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}