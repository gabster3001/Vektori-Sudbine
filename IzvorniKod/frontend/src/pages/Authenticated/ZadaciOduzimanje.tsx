import React from "react";
import "./ZadaciOduzimanje.css";
import Zadatak from "../../components/NasumicanZadatakOduzimanje";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

const ZadaciZbrajanje: React.FC = () => {
  const navigate = useNavigate();
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="zadaci-oduzimanje-page">
      <Header />
      <div className="main-content-zadaci-oduzimanje">
        <div className="zadaci-oduzimanje-navigation">
<<<<<<< HEAD
          <button
            className="back-button-zadaci-oduzimanje"
            onClick={() => navigate(-1)}
          >
            &lt;
          </button>
          <div className="zadaci-oduzimanje-title">
            Zadaci - oduzimanje vektora
=======
            <button className="back-button-zadaci-oduzimanje" onClick={() => navigate(-1)}>
              &lt;
            </button>
            <div className="zadaci-oduzimanje-title">Zadaci - oduzimanje vektora <br></br>
              
            </div>
>>>>>>> 96118acaadbf979a9a03adebec156641528171ee
          </div>
        </div>
        <div className="odabrano-oduzimanje-middle">
<<<<<<< HEAD
          <Zadatak />
=======
          <p> Postoje 2 točna odgovora!</p>
          <Zadatak /> 
>>>>>>> 96118acaadbf979a9a03adebec156641528171ee
          <button onClick={refreshPage} className="novi-zadatak-button">
            Novi Zadatak
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default ZadaciZbrajanje;

export {};
