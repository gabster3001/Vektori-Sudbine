import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log("Is authenticated:", isAuthenticated);

  // Ako korisnik nije autentificiran, preusmjerite ga na login stranicu (ili početnu)
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
