import React, { useState, useEffect } from "react";
import axios from "../../config/axiosConfig";
import { useAuth } from "../../components/AuthContext";
import "./Header.css";

interface UsernameResponse {
  username: string;
}

const Header: React.FC = () => {
  const { logout } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsername = async () => {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get<UsernameResponse>(
          "http://localhost:5000/api/get-username"
        );
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching username:", error);
        if ((error as any).response?.status === 401) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsername();
  }, [logout]);

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
