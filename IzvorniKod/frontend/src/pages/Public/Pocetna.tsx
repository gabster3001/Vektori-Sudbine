import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContext"; // Import AuthContext
import "./Pocetna.css";

const Pocetna: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth(); // Koristimo AuthContext za login
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true); // Postavljamo stanje učitavanja

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Server Response:", data);
        login(data.token); // Koristimo AuthContext za pohranu tokena
        console.log("Prijava uspješna:", data.message);
        navigate("/izbornik"); // Preusmjeravanje na izbornik
      } else {
        console.error("Greška prilikom prijave:", data.message);
        setErrorMessage(data.message || "Prijava nije uspjela.");
      }
    } catch (error) {
      setErrorMessage("Nije moguće spojiti se na poslužitelj.");
      console.error(error);
    } finally {
      setLoading(false); // Zaustavljamo učitavanje
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
              <button type="submit" disabled={loading}>
                {loading ? "Prijava..." : "Log in"}
              </button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
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
