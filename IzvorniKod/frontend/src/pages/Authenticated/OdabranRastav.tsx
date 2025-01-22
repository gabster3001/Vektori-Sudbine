import React from "react";
import { Link, useNavigate } from "react-router-dom";
import VectorSimulator from "../../components/VectorSimulator/VectorSimulator";
import Header from "../../components/Header/Header";
//import { MathJax, MathJaxContext } from "better-react-mathjax";
import "./OdabranRastav.css";

const OdabranRastav: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="odabran-rastav">
      <Header /> {/* zamijeniti kasnije */}
      <div className="main-content">
        <div className="rastav-content">
          <div className="odabran-rastav-navigation">
            <button className="back-button" onClick={() => navigate(-1)}>
              &lt;
            </button>
            <div className="odabran-rastav-title">
              Rastav vektora na komponente
            </div>
          </div>

          <div className="odabran-rastav-sadrzaj">
            <div className="odabran-rastav-middle">
              <div id="rastav-teorija" className="section">
                <h2>Rastav vektora na komponente</h2>
                <p>
                  Rastav vektora na komponente znači razdvajanje vektora u
                  smjerovima osovina. U dvije dimenzije, vektor se može
                  rastaviti u dva smjera:
                  <b> x</b> i <b>y</b> komponente.
                </p>
                <p>
                  Na primjer, neka je vektor <b>v</b> dan sa svojom veličinom i
                  smjerom. Za dobivanje komponenti u smjeru <b>x</b> i <b>y</b>,
                  koristit ćemo trigonometriju:
                </p>
                <ul>
                  <li>
                    <b>
                      v<sub>x</sub>
                    </b>{" "}
                    = v * cos(θ)
                  </li>
                  <li>
                    <b>
                      v<sub>y</sub>
                    </b>{" "}
                    = v * sin(θ)
                  </li>
                </ul>
                <p>
                  Gdje je <b>v</b> veličina vektora, a <b>θ</b> kut između
                  vektora i pozitivne <b>x</b> osi.
                </p>
              </div>

              <div id="rastav-postupak" className="section">
                <h3>Postupak rastava vektora</h3>
                <ol>
                  <li>
                    Odredimo veličinu vektora i kut koji vektor čini s
                    pozitivnom <b>x </b>
                    osi.
                  </li>
                  <li>
                    Koristimo trigonometske funkcije (cos i sin) za izračun
                    komponenti.
                  </li>
                  <li>
                    Izračunate komponente mogu se predstaviti kao{" "}
                    <b>
                      v<sub>x</sub>
                    </b>{" "}
                    i
                    <b>
                      {" "}
                      v<sub>y</sub>
                    </b>
                    .
                  </li>
                </ol>
              </div>

              <div id="rastav-primjeri" className="section">
                <h3>Primjeri rastava vektora</h3>
                <p>
                  Ako imamo vektor <b>v</b> s veličinom 10 jedinica i kutom od
                  30° u odnosu na <b>x</b>-os, komponente će biti:
                </p>
                <ul>
                  <li>
                    <b>
                      v<sub>x</sub>
                    </b>{" "}
                    = 10 * cos(30°) ≈ 8.66
                  </li>
                  <li>
                    <b>
                      v<sub>y</sub>
                    </b>{" "}
                    = 10 * sin(30°) = 5
                  </li>
                </ul>
                <p>
                  Dakle, vektor <b>v</b> ima komponente:{" "}
                  <b>
                    v<sub>x</sub> ≈ 8.66
                  </b>{" "}
                  i
                  <b>
                    {" "}
                    v<sub>y</sub> = 5
                  </b>
                  .
                </p>
              </div>
            </div>

            <div className="vector-simulator-rastav">
              <h2>Pokušajte sami!</h2>
              <VectorSimulator />
            </div>
          </div>
        </div>

        <div className="content-right">
          <div className="odabran-rastav-navigation">
            <Link to="/zbrajanje" className="zbrajanje-button">
              zbrajanje
            </Link>
            <Link to="/oduzimanje" className="oduzimanje-button">
              oduzimanje
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OdabranRastav;
