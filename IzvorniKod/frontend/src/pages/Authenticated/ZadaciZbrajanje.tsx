import React from "react";
import "./ZadaciZbrajanje.css";
import Zadatak from "../../components/NasumicanZadatakZbrajanje";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

const ZadaciZbrajanje: React.FC = () => {
  const navigate = useNavigate();
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="zadaci-zbrajanje-page">
      <Header />
      <div className="main-content-zadaci-zbrajanje">
        <div className="zadaci-zbrajanje-navigation">
          <button
            className="back-button-zadaci-zbrajanje"
            onClick={() => navigate(-1)}
          >
            &lt;
          </button>
          <div className="zadaci-zbrajanje-title">
            Zadaci - zbrajanje vektora
          </div>
        </div>
        <div className="odabrano-zbrajanje-middle">
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
