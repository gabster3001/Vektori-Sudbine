import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Pocetna.css";

const Pocetna: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate(); // Hook za navigaciju

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setErrorMessage("");
        console.log("Logged in user:", data.user);

        // Navigacija na stranicu Izbornik
        navigate("/izbornik");
      } else {
        setErrorMessage(data.message);
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Failed to connect to the server.");
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <header className="header">
        <div className="logo">PRO-R</div>
        <div className="profile">
          <div className="profile-icon"></div>
          <a href="/">prijavi se ili registriraj</a>
        </div>
      </header>

      <main className="content">
        <div className="info-box">
          <p>Nauči i izvježbaj zbrajanje i oduzimanje vektora i rastav sila</p>
        </div>

        <div className="auth-box">
          <div className="login-section">
            <h2>Log in</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="lozinka"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Log in</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
            <button className="google-login">google log in</button>
          </div>

          <div className="divider"></div>

          <div className="register-section">
            <h2>Register</h2>
            <p>Još nemaš račun?</p>
            <a href="/registracija" className="register-button">
              Registracija
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pocetna;
