import React, { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import { useAuth } from "../../components/AuthContext";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
}

const Header: React.FC = () => {
  const { logout } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

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
        <Link to="/izbornik" className="header__logo">
          PRO-R
        </Link>
        <div className="header__user-info">
          <Link to="/profil" className="header__username">
            Loading...
          </Link>
          <div className="header__icon">⭐</div>
        </div>
      </div>
    );
  }

  return (
    <header className="header">
      <Link to="/izbornik" className="header__logo">
        PRO-R
      </Link>
      <div className="header__user-info">
        <Link to="/profil" className="header__username">
          {username || "Gost"}
        </Link>
        <div className="header__icon">⭐</div>
      </div>
    </header>
  );
};

export default Header;
