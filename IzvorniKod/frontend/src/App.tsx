import React from "react";
import { Routes, Route } from "react-router-dom";

import Pocetna from "./pages/Public/Pocetna";
import OdabranRastav from "./pages/Authenticated/OdabranRastav";
import OdabranoZbrajanje from "./pages/Authenticated/OdabranoZbrajanje";
import ZadaciZbrajanje from "./pages/Authenticated/ZadaciZbrajanje";
import ZadaciOduzimanje from "./pages/Authenticated/ZadaciOduzimanje";
import OdabranoOduzimanje from "./pages/Authenticated/OdabranoOduzimanje";
import Izbornik from "./pages/Authenticated/Izbornik";
import ProtectedRoute from "./components/ProtectedRoute";
import Registracija from "./pages/Public/Registracija";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Pocetna />} />
      <Route path="/registracija" element={<Registracija />} />

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
        path="/zadaci-zbrajanje"
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
            <OdabranoOduzimanje />
          </ProtectedRoute>
        }
      />
      <Route
        path="/zadaci-oduzimanje"
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
    </Routes>
  );
};

export default App;
