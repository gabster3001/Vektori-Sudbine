import React from "react";
import { Routes, Route } from "react-router-dom";
import "./config/axiosConfig";
import Pocetna from "./pages/Public/Pocetna";
import OdabranRastav from "./pages/Authenticated/OdabranRastav";
import OdabranoZbrajanje from "./pages/Authenticated/OdabranoZbrajanje";
import ZadaciZbrajanje from "./pages/Authenticated/ZadaciZbrajanje";
import ZadaciOduzimanje from "./pages/Authenticated/ZadaciOduzimanje";
import OdabranoOduzimanje from "./pages/Authenticated/OdabranoOduzimanje";
import Izbornik from "./pages/Authenticated/Izbornik";
import Registracija from "./pages/Public/Registracija";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Pocetna />} />
      <Route path="/registracija" element={<Registracija />} />
      <Route path="/izbornik" element={<Izbornik />} />
      <Route path="/zbrajanje" element={<OdabranoZbrajanje />} />
      <Route path="/zadaci-zbrajanje" element={<ZadaciZbrajanje />} />
      <Route path="/oduzimanje" element={<OdabranoOduzimanje />} />
      <Route path="/zadaci-oduzimanje" element={<ZadaciOduzimanje />} />
      <Route path="/rastav" element={<OdabranRastav />} />
    </Routes>
  );
};

export default App;
