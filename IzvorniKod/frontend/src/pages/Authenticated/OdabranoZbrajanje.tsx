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

            <div id="podsjetnik" className="section">
              <h2>Podsjetnik o vektorima</h2>
              <p>Vektor je <b>usmjerena dužina </b>kojoj je jedna rubna točka određena za početak, a druga za kraj (završetak). </p>
              <p> Vektor, kojemu je početna točka A, a završna točka B, označavamo s AB strelica.</p>
              <p> Svaki vektor ima svoju <b>duljinu</b>, <b>smjer</b> i <b>orijentaciju</b>. Smjer vektora određen je pravcem kojemu vektor pripada.</p>
              <p> Orijentaciju vektora pokazuje njegova strelica.</p>
              
            </div>

            <div id="jedna-dimenzija" className="section">
              <div id="teorija-1d">
                <h2>Zbrajanje vektora u jednoj dimenziji</h2>
                <p>Ako vektori imaju isti smjer (pripadaju istom pravcu ili paralelnim pravcima), onda kažemo da su ti vektori <b>kolinearni</b>.</p>
                <p>
                    Kada zbrajamo vektore u jednoj dimenziji, zamislimo ih kao strelice na pravcu.  
                    Da bismo ih zbrojili, zbrajamo njihove iznose.
                    <ol>
                        <li>Dodajemo duljine vektora ako idu u istom smjeru.</li>
                        <li>Oduzimamo duljine ako idu u suprotnim smjerovima.</li>
                    </ol>
                    Zbroj dvaju vektora je vektor koji počinje u početnoj točki prvoga vektora, a završava u završnoj točki drugoga vektora.
                </p>
              </div>

              <div id="postupak-1d">
                <p><b>Postupak zbrajanja </b>
                  <ol>
                    <li>Nacrtamo pravac na kojem leži jedan od vektora.</li>
                    <li>Na pravcu odaberemo početnu točku <b>O</b>.</li>
                    <li>Nacrtamo vektor OA = a koji počinje u odabranoj točki O.</li>
                    <li>Nacrtamo vektor AB = b koji počinje u točki A.</li>
                    <li>Zbroj vektora a i b je vektor OB. </li>
                  </ol>
                </p>
              </div>

              <div id="primjeri-1d">
                <p><b>Primjeri</b></p>
              </div>
            </div>

            <div id="dvije-dimenzije" className="section">
              <h2>Zbrajanje vektora u dvije dimenzije</h2>
              <p>Ako vektori nemaju isti smjer (ne pripadaju istom pravcu ili usporednim pravcima), onda kažemo da su ti vektori <b>nekolinearni</b>.</p>
              <p>
                  Postoje dva načina zbrajanja dva nekolinearna vektora: <b>PRAVILO TROKUTA</b> i <b>PRAVILO PARALELOGRAMA</b>.
              </p>
              
              <div id="pravilo-trokuta">
                <p><b>PRAVILO TROKUTA</b></p>
                <ol>
                    <li>Početak vektora b dovesti na kraj vektora a.</li>
                    <li>Nacrtaj novi rezultantni vektor koji počinje u početku vektora a, i završava u završetku vektora b.</li>
                </ol>
              </div>

              <div id="pravilo-paralelograma">
                <p><b>PRAVILO PARALELOGRAMA</b></p>
                <ol>
                    <li>Početke oba vektora staviti u istu točku. </li>
                    <li>Konstruiraj paralelogram, tako da u završetak vektora b docrtaš točkastom linijom kopiju vektora a, i isto napravi za posljednju stranicu.</li>
                    <li>Dijagonala paralelograma je rezultantni vektor a + b.</li>
                </ol>
              </div>

              <div id="primjeri-2d">
                <p><b>Primjeri</b></p>
              </div>
              
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
