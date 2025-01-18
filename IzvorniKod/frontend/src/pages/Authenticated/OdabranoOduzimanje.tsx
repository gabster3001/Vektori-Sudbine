import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../..//components/Header/Header";
import "./OdabranoOduzimanje.css";
import { ChevronDown } from "lucide-react";

const OdabranoOduzimanje: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const menuItems = {
    "1D": [
      { title: "Formule", id: "formule-1d" },
      { title: "Teorija", id: "teorija-1d" },
      { title: "Primjeri", id: "primjeri-1d" },
    ],
    "2D": [
      { title: "Pravilo trokuta", id: "pravilo-trokuta" },
      { title: "Primjeri", id: "primjeri-2d" },
      { title: "Pravilo paralelograma", id: "pravilo-paralelograma" },
    ],
  };

  return (
    <div className="odabrano-oduzimanje">
      <Header />
      <div className="main-content">
        <div className="oduzimanje-content">
          <div className="odabrano-oduzimanje-navigation">
            <button className="back-button" onClick={() => navigate(-1)}>
              &lt;
            </button>
            <div className="odabrano-oduzimanje-title">Oduzimanje vektora</div>
          </div>

          <div className="odabrano-oduzimanje-middle">
            <div className="oduzimanje-buttons">
              <div className="dropdown">
                <button
                  className="dropdown-button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  sadržaj
                  <ChevronDown
                    className={`dropdown-icon ${isMenuOpen ? "open" : ""}`}
                  />
                </button>
                {isMenuOpen && (
                  <div className="dropdown-content">
                    <div className="dropdown-section">
                      <h3>Zbrajanje u 1D</h3>
                      {menuItems["1D"].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleScrollToSection(item.id)}
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                    <div className="dropdown-section">
                      <h3>Zbrajanje u 2D</h3>
                      {menuItems["2D"].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleScrollToSection(item.id)}
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                id="one-d"
                onClick={() => handleScrollToSection("jedna-dimenzija")}
              >
                JEDNA DIMENZIJA
              </button>
              <button
                id="two-d"
                onClick={() => handleScrollToSection("dvije-dimenzije")}
              >
                DVIJE DIMENZIJE
              </button>
            </div>

            <div id="jedna-dimenzija" className="section">
              <h2>Oduzimanje vektora u jednoj dimenziji</h2>
              <p>tekst i primjeri</p>
            </div>

            <div id="dvije-dimenzije" className="section">
              <h2>Oduzimanje vektora u dvije dimenzije</h2>
              <p>tekst i primjeri</p>
            </div>
          </div>
        </div>

        <div className="content-right">
          <div className="odabrano-oduzimanje-navigation">
            <Link to="/zbrajanje" className="zbrajanje-button">
              zbrajanje
            </Link>
            <Link to="/rastav" className="rastav-button">
              rastav
            </Link>
          </div>

          <div className="card-right">
            <h3>Želiš li provježbati naučeno?</h3>
            <Link to="/zadaci-oduzimanje" className="zadaci-button">
              zadatci
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OdabranoOduzimanje;
