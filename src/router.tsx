// src/router.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";
import Preferences from "./pages/Preferences";

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
      <ProtectedRoute>
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
        element: <Preferences />
      },

      
      { path: "plan/*", element: null },
      
      { path: "execute/quality-checks", element: null},//<QualityChecks /> },
      { path: "execute/*", element: null }, // Catch-all for the other Execute links
      
      { path: "monitor/*", element: null },
      { path: "analyse/*", element: null },
      { path: "configure/*", element: null },
      { path: "set-up/*", element: null },
      { path: "manual/*", element: null }
    ]
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />
  }
]);