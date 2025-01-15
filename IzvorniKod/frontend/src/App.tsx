import React from "react";
import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import ZadaciZbrajanje from "./pages/Authenticated/ZadaciZbrajanje";
import ZadaciOduzimanje from "./pages/Authenticated/ZadaciOduzimanje";
import ZadaciRastav from "./pages/Authenticated/ZadaciRastav";
import OdabranoZbrajanje from "./pages/Authenticated/OdabranoZbrajanje";
import OdabranRastav from "./pages/Authenticated/OdabranRastav";
import Registracija from "./pages/Public/Registracija";
import Pocetna from "./pages/Public/Pocetna";
import Izbornik from "./pages/Authenticated/Izbornik";
import ProtectedRoute from "./components/ProtectedRoute";
=======
import ZadaciZbrajanje from "./pages/ZadaciZbrajanje/ZadaciZbrajanje";
import ZadaciOduzimanje from "./pages/ZadaciOduzimanje/ZadaciOduzimanje";
import ZadaciRastav from "./pages/ZadaciRastav/ZadaciRastav";
import OdabranoZbrajanje from "./pages/OdabranoZbrajanje/OdabranoZbrajanje";
import OdabranoOduzimanje from "./pages/OdabranoOduzimanje/OdabranoOduzimanje";
import OdabranRastav from "./pages/OdabranRastav/OdabranRastav";
import Registracija from "./pages/Registracija/Registracija";
import Pocetna from "./pages/Pocetna/Pocetna";
import Izbornik from "./pages/Izbornik/Izbornik";

>>>>>>> a41f71e2f2330e5ce55dc7230959fafe071b6fd8

const App: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Pocetna />} />
      <Route path="/registracija" element={<Registracija />} />
<<<<<<< HEAD

      {/* Protected routes */}
      <Route
        path="/izbornik"
        element={
          <ProtectedRoute>
            <Izbornik />
          </ProtectedRoute>
        }
      />
      <Route
        path="/zbrajanje"
        element={
          <ProtectedRoute>
            <OdabranoZbrajanje />
          </ProtectedRoute>
        }
      />
      <Route
        path="/zbrajanjezadaci"
        element={
          <ProtectedRoute>
            <ZadaciZbrajanje />
          </ProtectedRoute>
        }
      />
      <Route
        path="/oduzimanje"
        element={
          <ProtectedRoute>
            <ZadaciOduzimanje />
          </ProtectedRoute>
        }
      />
      <Route
        path="/rastav"
        element={
          <ProtectedRoute>
            <OdabranRastav />
          </ProtectedRoute>
        }
      />
=======
      <Route path="/izbornik" element={<Izbornik />} />
      
      <Route path="/zbrajanje" element={<OdabranoZbrajanje />} />
      <Route path="/oduzimanje" element={<OdabranoOduzimanje />} />
      <Route path="/rastav" element={<OdabranRastav />} />
      
      <Route path="/zadaci-oduzimanje" element={<ZadaciOduzimanje/>} />
      <Route path="/zadaci-zbrajanje" element={<ZadaciZbrajanje/>} />
      <Route path="/zadaci-rastav" element={<ZadaciRastav/>} />
>>>>>>> a41f71e2f2330e5ce55dc7230959fafe071b6fd8
    </Routes>
  );
};

export default App;

