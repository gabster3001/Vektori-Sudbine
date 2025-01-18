import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./OdabranoZbrajanje.css";
import { ChevronDown } from "lucide-react";

const OdabranoZbrajanje: React.FC = () => {
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
    <div className="odabrano-zbrajanje">
      <Header />

      <div className="main-content">
        <div className="zbrajanje-content">
          <div className="odabrano-zbrajanje-navigation">
            <button className="back-button" onClick={() => navigate(-1)}>
              &lt;
            </button>
            <div className="odabrano-zbrajanje-title">zbrajanje vektora</div>
          </div>

          <div className="odabrano-zbrajanje-middle">
            <div className="zbrajanje-buttons">
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
              <h2>Zbrajanje vektora u jednoj dimenziji</h2>
              <p>tekst i primjeri</p>
            </div>

            <div id="dvije-dimenzije" className="section">
              <h2>Zbrajanje vektora u dvije dimenzije</h2>
              <p>tekst i primjeri</p>
            </div>
          </div>
        </div>

        <div className="content-right">
          <div className="odabrano-zbrajanje-navigation">
            <Link to="/oduzimanje" className="oduzimanje-button">
              oduzimanje
            </Link>
            <Link to="/rastav" className="rastav-button">
              Rastav
            </Link>
          </div>

          <div className="card-right">
            <h3>Želiš li provježbati naučeno?</h3>
            <Link to="/zadaci-zbrajanje" className="zadaci-button">
              zadatci
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OdabranoZbrajanje;
