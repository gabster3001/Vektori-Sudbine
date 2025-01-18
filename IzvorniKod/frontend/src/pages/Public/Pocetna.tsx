import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Pocetna.css";

// Define the type of the server response
interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

const Pocetna: React.FC = () => {
  const username = "Korisnik";
  const level = 3;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Perform login request
      const response = await axios.post<LoginResponse>(
        "http://localhost:5000/login",
        {
          email,
          password,
        }
      );

      const { token, user } = response.data;

      // Save token to localStorage
      localStorage.setItem("authToken", token);

      // Navigate to the Izbornik page
      navigate("/izbornik");

      console.log("Logged in as:", user.name);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="login-page">
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
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="lozinka"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Log in</button>
            </form>
            {error && <p className="error">{error}</p>}
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
