import React from "react";
import { Routes, Route } from "react-router-dom";
import ZadaciZbrajanje from "./pages/Authenticated/ZadaciZbrajanje";
import ZadaciOduzimanje from "./pages/Authenticated/ZadaciOduzimanje";
import ZadaciRastav from "./pages/Authenticated/ZadaciRastav";
import OdabranoZbrajanje from "./pages/Authenticated/OdabranoZbrajanje";
import OdabranRastav from "./pages/Authenticated/OdabranRastav";
import Registracija from "./pages/Public/Registracija";
import Pocetna from "./pages/Public/Pocetna";
import Izbornik from "./pages/Authenticated/Izbornik";
const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Pocetna />} />
      <Route path="/izbornik" element={<Izbornik />} />
      <Route path="/registracija" element={<Registracija />} />
      <Route path="/zbrajanje" element={<OdabranoZbrajanje />} />
      <Route path="/oduzimanje" element={<ZadaciOduzimanje />} />
      <Route path="/rastav" element={<OdabranRastav />} />
    </Routes>
  );
};

export default App;
