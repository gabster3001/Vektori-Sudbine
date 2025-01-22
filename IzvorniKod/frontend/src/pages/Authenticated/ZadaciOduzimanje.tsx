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
          <button
            className="back-button-zadaci-oduzimanje"
            onClick={() => navigate(-1)}
          >
            &lt;
          </button>
          <div className="zadaci-oduzimanje-title">
            Zadaci - oduzimanje vektora
          </div>
        </div>
        <div className="odabrano-oduzimanje-middle">
          <Zadatak />
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
