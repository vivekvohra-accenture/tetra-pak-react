import { createBrowserRouter } from "react-router-dom";
import Login from "./auth/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <Login />
  },
  {
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
        path: "plan",
        element: <div>Plan page Coming Soon</div>
      },
      {
        path: "preference",
        element: <div>Preference page Coming Soon</div>
      },
      {
        path: "execute",
        element: <div>Execute page Coming Soon</div>
      },
      {
        path: "configure",
        element: <div>Configure page Coming Soon</div>
        },
      {
        path: "set-up",
        element: <div>Set-up page Coming Soon</div>
      },
      {
        path: "manual",
        element: <div>Manual page Coming Soon</div>
      },
      {
        path: "monitor",
        element: <div>Monitor page Coming Soon</div>
      },
      {
        path: "analyse",
        element: <div>Analyse page Coming Soon</div>
      }
    ]
  }
]);