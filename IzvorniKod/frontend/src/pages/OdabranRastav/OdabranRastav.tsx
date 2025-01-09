import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import VectorSimulator from "../../components/VectorSimulator/VectorSimulator";
import Header from "../../components/Header/Header";
import "./OdabranRastav.css";

const OdabranRastav: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className="odabran-rastav">
        <Header username="username" level={1} /> {/* zamijeniti kasnije */}

        <div className="main-content">
            <div className="rastav-content">
            <div className="odabran-rastav-navigation">
                <button className="back-button" onClick={() => navigate(-1)}>
                &lt;
                </button>
                <div className="odabran-rastav-title">Rastav vektora na komponente</div>
            </div>

            <div className="odabran-rastav-middle">
              <VectorSimulator />                
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

                <div className="card-right">
                    <h3>Pokušajte sami!</h3>
                    <Link to="/zadaci-rastav" className="zadaci-button">
                    zadatci
                    </Link>
                </div>
            </div>
        </div>
        </div>


    );
};

export default OdabranRastav;

