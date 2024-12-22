import React from "react";
import { Routes, Route } from "react-router-dom";
import ZadaciZbrajanje from "./pages/ZadaciZbrajanje";
import ZadaciOduzimanje from "./pages/ZadaciOduzimanje";
import ZadaciRastav from "./pages/ZadaciRastav";
import OdabranoZbrajanje from "./pages/OdabranoZbrajanje";
import Registracija from "./pages/Registracija";
import Pocetna from "./pages/Pocetna";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Pocetna />} />
      <Route path="/registracija" element={<Registracija />} />
      <Route path="/zbrajanje" element={<OdabranoZbrajanje />} />
      <Route path="/oduzimanje" element={<ZadaciOduzimanje />} />
      <Route path="/rastav" element={<ZadaciRastav />} />
    </Routes>
  );
};

export default App;

