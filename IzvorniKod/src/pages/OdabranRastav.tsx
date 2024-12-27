import React from "react";
import Button from "../components/Button";
import VectorSimulator from "../components/VectorSimulator";
import "../components/VectorSimulator.css";
import Header from "../components/Header";
import "./OdabranRastav.css";

export default function OdabranoZbrajanje() {
  return (
    <div className="canvas-container">
      {/* Uključujemo simulator vektora */}
      <VectorSimulator />
    </div>
  );
}
