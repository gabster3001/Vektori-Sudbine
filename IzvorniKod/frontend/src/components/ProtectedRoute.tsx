import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  console.log("Is authenticated:", isAuthenticated);

  if (!isAuthenticated) {
    // Call logout which will clear both authToken and user from localStorage
    logout();
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
