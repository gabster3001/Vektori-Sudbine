import React from "react";
import "./Izbornik.css";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";

const Izbornik: React.FC = () => {
  return (
    <div className="izbornik">
      <Header />
      <h1 className="izbornik__naslov">Što želiš naučiti?</h1>
      <div className="izbornik__opcije">
        {/* Kartica za zbrajanje vektora */}
        <div className="kartica">
          <h2 className="kartica__naslov">Zbrajanje vektora</h2>
          <Link to="/zbrajanje" className="kartica__opcija">
            Jedna dimenzija
          </Link>
          <Link to="/zbrajanje" className="kartica__opcija">
            Dvije dimenzije
          </Link>
          <Link to="/zbrajanje" className="kartica__pravilo">
            🔺 Pravilo trokuta
          </Link>
          <Link to="/zbrajanje" className="kartica__pravilo">
            🔷 Pravilo paralelograma
          </Link>
        </div>

        {/* Kartica za oduzimanje vektora */}
        <div className="kartica">
          <h2 className="kartica__naslov">Oduzimanje vektora</h2>
          <Link to="/oduzimanje" className="kartica__opcija">
            Jedna dimenzija
          </Link>
          <Link to="/oduzimanje" className="kartica__opcija">
            Dvije dimenzije
          </Link>
          <Link to="/zbrajanje" className="kartica__pravilo">
            🔺 Pravilo trokuta
          </Link>
          <Link to="/zbrajanje" className="kartica__pravilo">
            🔷 Pravilo paralelograma
          </Link>
        </div>

        {/* Kartica za rastav sila */}
        <div className="kartica">
          <h2 className="kartica__naslov">Rastav sila</h2>
          <Link to="/rastav" className="kartica__opcija">
            Rastav sile na komponente
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Izbornik;
