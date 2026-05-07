// src/router.tsx
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Login from "./auth/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";
import Preferences from "./pages/Preferences";
import QualityChecks from "./pages/QualityChecks";
import { routeAccessMap } from "./config/routeAccessMap";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    // Keeping your original parent route intact!
    path: "/home",
    element: (
      <ProtectedRoute allowedRoles={routeAccessMap["/home"]}> {/* 🆕 Check access for the main /home route */}
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />
      },

      {
        path: "preference",
        element: (
          <ProtectedRoute allowedRoles={routeAccessMap["/home/preference"]}>
            <Preferences />
          </ProtectedRoute>
        ),
      },

      
      {
        path: "plan/*",
        element: (
          <ProtectedRoute allowedRoles={routeAccessMap["/home/plan"]}>
            <Outlet />
          </ProtectedRoute>
        ),
      },
      
      {
        path: "execute/quality-checks",
        element: (
          <ProtectedRoute allowedRoles={routeAccessMap["/home/execute/quality-checks"]}>
            <QualityChecks />
          </ProtectedRoute>
        ),
      },

      {
        path: "execute/*",
        element: (
          <ProtectedRoute allowedRoles={routeAccessMap["/home/execute"]}>
            <Outlet />
          </ProtectedRoute>
        ),
      },

      {
        path: "monitor/*",
        element: (
          <ProtectedRoute allowedRoles={routeAccessMap["/home/monitor"]}>
            <Outlet />
          </ProtectedRoute>
        ),
      },

      // ✅ MAIN FIX: ADMIN-only Analyse
      {
        path: "analyse/*",
        element: (
          <ProtectedRoute allowedRoles={routeAccessMap["/home/analyse"]}>
            <Outlet />
          </ProtectedRoute>
        ),
      },

      {
        path: "configure/*",
        element: (
          <ProtectedRoute allowedRoles={routeAccessMap["/home/configure"]}>
            <Outlet />
          </ProtectedRoute>
        ),
      },

      {
        path: "set-up/*",
        element: (
          <ProtectedRoute allowedRoles={routeAccessMap["/home/set-up"]}>
            <Outlet />
          </ProtectedRoute>
        ),
      },

      {
        path: "manual/*",
        element: (
          <ProtectedRoute allowedRoles={routeAccessMap["/home/manual"]}>
            <Outlet />
          </ProtectedRoute>
        ),
      },
      
    ]
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />
  }
]);