import React, { useState, useEffect } from "react";
import "./Profil.css";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

const Profil: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData: User = JSON.parse(userString);
      setUsername(userData.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error("Password change error:", err.response);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unexpected error changing password"
      );
    }
  };

  return (
    <div className="profil">
      <Header />
      <div className="profil__container">
        <div className="profil__avatar-circle">
          <div className="profil__avatar-placeholder">
            {username.charAt(0).toUpperCase()}
          </div>
        </div>
        <h2 className="profil__username">{username}</h2>
        <button className="profil__logout-button" onClick={handleLogout}>
          Odjava
        </button>

        <div className="profil__password-change-container">
          <form
            className="profil__password-change-form"
            onSubmit={handlePasswordChange}
          >
            <h3>Promjena lozinke</h3>
            {error && <p className="profil__error">{error}</p>}
            {success && <p className="profil__success">{success}</p>}
            <input
              type="password"
              placeholder="Trenutna lozinka"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Nova lozinka"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Potvrdi novu lozinku"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="profil__change-password-button">
              Promijeni lozinku
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profil;
