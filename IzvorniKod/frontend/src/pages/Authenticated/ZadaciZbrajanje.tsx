import React from "react";
import "./Izbornik.css";
import Zadatak from "../../components/NasumicanZadatakZbrajanje";
import Header from "../../components/Header/Header"; // Importing the Header component

const ZadaciZbrajanje: React.FC = () => {
  // Function to refresh the page
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div>
      <Header /> {/* Rendering the Header component */}
      <Zadatak /> {/* Rendering the Zadatak component */}
      <button onClick={refreshPage} className="novi-zadatak-button">
        Novi Zadatak
      </button>{" "}
      {/* Button to refresh the page */}
    </div>
  );
};

export default ZadaciZbrajanje;

// Add this to make it a module explicitly
export {};
