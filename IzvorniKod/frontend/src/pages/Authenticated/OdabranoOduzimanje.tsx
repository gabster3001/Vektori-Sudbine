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
      { title: "Teorija", id: "teorija-1d" },
      { title: "Postupak", id: "postupak-1d" },
      { title: "Primjeri", id: "primjeri-1d" },
    ],
    "2D": [
      { title: "Pravilo trokuta", id: "pravilo-trokuta" },
      { title: "Pravilo paralelograma", id: "pravilo-paralelograma" },
      { title: "Primjeri", id: "primjeri-2d" },
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
                      <h3>Oduzimanje u 1D</h3>
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
                      <h3>Oduzimanje u 2D</h3>
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

            <div id="podsjetnik" className="section">
              <h2>Podsjetnik o vektorima</h2>
              <p>Vektor je <b>usmjerena dužina </b>kojoj je jedna rubna točka određena za početak, a druga za kraj (završetak). </p>
              <p> Vektor, kojemu je početna točka A, a završna točka B, označavamo s AB strelica.</p>
              <p> Svaki vektor ima svoju <b>duljinu</b>, <b>smjer</b> i <b>orijentaciju</b>. Smjer vektora određen je pravcem kojemu vektor pripada.</p>
              <p> Orijentaciju vektora pokazuje njegova strelica.</p>
              
            </div>

            <div id="jedna-dimenzija" className="section">
            <div id="teorija-1d">
                <h2>Oduzimanje vektora u jednoj dimenziji</h2>
                <p>
                  Oduzimanje vektora u jednoj dimenziji temelji se na korištenju
                  <b> negativnog vektora</b>. Negativni vektor ima istu duljinu kao
                  originalni vektor, ali je orijentiran u suprotnom smjeru.
                </p>
                <p>
                  Oduzimanje vektora zapisuje se kao: <b>a - b = a + (-b)</b>. Time
                  se oduzimanje svodi na zbrajanje vektora <b>a</b> i negativnog
                  vektora <b>-b</b>.
                </p>
              </div>

              <div id="postupak-1d">
                <p><b>Postupak oduzimanja </b>
                  <ol>
                    <li>Nacrtamo pravac na kojem leži jedan od vektora.</li>
                    <li>Odaberemo početnu točku <b>O</b>.</li>
                    <li>Nacrtamo vektor <b>OA = a</b> koji počinje u točki <b>O</b>.</li>
                    <li>Nacrtamo vektor <b>AB = -b</b> kao negativan vektor od <b>b</b>.</li>
                    <li>Rezultantni vektor je <b>OB</b>, koji počinje u točki <b>O</b> i završava u točki <b>B</b>.</li>
                  </ol>
                </p>
              </div>

              <div id="primjeri-1d">
                <p><b>Primjeri</b></p>
              </div>
            </div>

            <div id="dvije-dimenzije" className="section">
            <h2>Oduzimanje vektora u dvije dimenzije</h2>
              <p>Ako vektori nemaju isti smjer (ne pripadaju istom pravcu ili usporednim pravcima), onda kažemo da su ti vektori <b>nekolinearni</b>.</p>
              <p>
                Oduzimanje vektora u dvije dimenzije također se temelji na korištenju
                <b> negativnog vektora</b>. Postupak se svodi na zbrajanje vektora 
                <b> a</b> i <b>-b</b> pomoću pravila trokuta ili pravila paralelograma.
              </p>
              
              <div id="pravilo-trokuta">
                <p><b>PRAVILO TROKUTA</b></p>
                <ol>
                  <li>Konstruiramo negativni vektor <b>-b</b>, koji ima istu duljinu kao <b>b</b>, ali suprotan smjer.</li>
                  <li>Početak vektora <b>-b</b> dovodimo na završetak vektora <b>a</b>.</li>
                  <li>Rezultantni vektor počinje u početku vektora <b>a</b> i završava u završetku vektora <b>-b</b>.</li>
                </ol>
              </div>

              <div id="pravilo-paralelograma">
                <p><b>PRAVILO PARALELOGRAMA</b></p>
                <ol>
                  <li>Početke vektora <b>a</b> i <b>-b</b> stavimo u istu točku.</li>
                  <li>Konstruiramo paralelogram koristeći vektore <b>a</b> i <b>-b</b> kao stranice.</li>
                  <li>Dijagonala paralelograma predstavlja rezultantni vektor <b>a - b</b>.</li>
                </ol>
              </div>

              <div id="primjeri-2d">
                <p><b>Primjeri</b></p>
              </div>
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
