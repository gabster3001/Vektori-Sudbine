import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import ZadaciOduzimanje from './pages/ZadaciOduzimanje';
import Registracija from './pages/Registracija';
import ZadaciRastav from './pages/ZadaciRastav';
import ZadaciZbrajanje from './pages/ZadaciZbrajanje';
import './App.css';
import axios from 'axios';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Registracija />} />
      <Route path="/zbrajanje" element={<ZadaciZbrajanje />} />
      <Route path="/oduzimanje" element={<ZadaciOduzimanje />} />
      <Route path="/rastav" element={<ZadaciRastav />} />
    </Routes>
  );
}

export default App;

