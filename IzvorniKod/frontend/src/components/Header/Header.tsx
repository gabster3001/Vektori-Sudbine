import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Header.css";

// Definirajte tip odgovora koji očekujete
interface UsernameResponse {
  username: string;
}

const Header: React.FC = () => {
  const [username, setUsername] = useState<string>(""); // Početno postavljanje username
  const [loading, setLoading] = useState<boolean>(true); // Stanje za praćenje učitavanja

  useEffect(() => {
    const token = localStorage.getItem("token"); // Uzmi token iz localStorage

    if (token) {
      // Funkcija za dohvat korisničkog imena
      const fetchUsername = async () => {
        try {
          const response = await axios.get<UsernameResponse>(
            "http://localhost:5000/api/get-username",
            {
              headers: {
                Authorization: `Bearer ${token}`, // Dodavanje JWT tokena u header
              },
            }
          );

          setUsername(response.data.username); // Postavi username u stanje
        } catch (error) {
          console.error("Error fetching username:", error);
        } finally {
          setLoading(false); // Postavljanje loading stanja na false
        }
      };

      fetchUsername(); // Pozivanje funkcije za dohvat username
    } else {
      setLoading(false); // Ako nema tokena, samo prestanemo sa učitavanjem
    }
  }, []); // Ovaj useEffect se pokreće samo jednom kada se komponenta učita

  if (loading) {
    return <div>Loading...</div>; // Prikazivanje loading poruke dok se učitava username
  }

  return (
    <header className="header">
      <div className="header__logo">PRO-R</div>
      <div className="header__user-info">
        <span className="header__username">{username || "Guest"}</span>{" "}
        {/* Prikazivanje username ili "Guest" ako nije prisutan */}
        <div className="header__icon">⭐</div>
      </div>
    </header>
  );
};

export default Header;
