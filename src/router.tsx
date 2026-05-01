import { createBrowserRouter } from "react-router-dom";
import Login from "./auth/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <Login />
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    )
  }
]);