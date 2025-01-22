import Register from "../../components/Register";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axiosConfig";
import { useAuth } from "../../components/AuthContext";

export default function Registracija() {
  const { logout } = useAuth();
  useEffect(() => {
    logout(); // Ovo će očistiti i localStorage i state
  }, [logout]);
  return (
    <div className="registracija-page">
      <Register />
    </div>
  );
}
