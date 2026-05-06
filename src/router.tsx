// src/router.tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";

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
        path: "preferences",
        element: <div className="page-container"><h2>Preferences</h2><p>Coming Soon</p></div>
      },
      // --- The Category Placeholders (Using Wildcards) ---
      // --- The Category Placeholders ---
      // Rendering 'null' leaves the right side completely empty, 
      // showing ONLY the beautiful factory background image!
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