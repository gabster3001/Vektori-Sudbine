import React, { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import { useAuth } from "../../components/AuthContext";
import "./Header.css";

interface User {
  id: number;
  name: string;
  email: string;
}

const Header: React.FC = () => {
  const { logout } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData: User = JSON.parse(userString);
      setUsername(userData.name);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="header">
        <div className="header__logo">PRO-R</div>
        <div className="header__user-info">
          <span className="header__username">Loading...</span>
          <div className="header__icon">⭐</div>
        </div>
      </div>
    );
  }

  return (
    <header className="header">
      <div className="header__logo">PRO-R</div>
      <div className="header__user-info">
        <span className="header__username">{username || "Gost"}</span>
        <div className="header__icon">⭐</div>
      </div>
    </header>
  );
};

export default Header;
