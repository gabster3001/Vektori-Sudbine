import React from "react";
import { Routes, Route } from "react-router-dom";
import ZadaciZbrajanje from "./pages/ZadaciZbrajanje/ZadaciZbrajanje";
import ZadaciOduzimanje from "./pages/ZadaciOduzimanje/ZadaciOduzimanje";
import ZadaciRastav from "./pages/ZadaciRastav/ZadaciRastav";
import OdabranoZbrajanje from "./pages/OdabranoZbrajanje/OdabranoZbrajanje";
import OdabranoOduzimanje from "./pages/OdabranoOduzimanje/OdabranoOduzimanje";
import OdabranRastav from "./pages/OdabranRastav/OdabranRastav";
import Registracija from "./pages/Registracija/Registracija";
import Pocetna from "./pages/Pocetna/Pocetna";
import Izbornik from "./pages/Izbornik/Izbornik";


const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Pocetna />} />
      <Route path="/registracija" element={<Registracija />} />
      <Route path="/izbornik" element={<Izbornik />} />
      
      <Route path="/zbrajanje" element={<OdabranoZbrajanje />} />
      <Route path="/oduzimanje" element={<OdabranoOduzimanje />} />
      <Route path="/rastav" element={<OdabranRastav />} />
      
      <Route path="/zadaci-oduzimanje" element={<ZadaciOduzimanje/>} />
      <Route path="/zadaci-zbrajanje" element={<ZadaciZbrajanje/>} />
      <Route path="/zadaci-rastav" element={<ZadaciRastav/>} />
    </Routes>
  );
};

export default App;

