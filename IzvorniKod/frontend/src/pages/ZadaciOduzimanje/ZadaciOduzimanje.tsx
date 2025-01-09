import React from "react";
import Header from "../../components/Header/Header";
import "./ZadaciOduzimanje.css";

export default function ZadaciOduzimanje() {
  return (
    <div className="zadaci-oduzimanje">

      <Header username="k" level={1}/>

      <main className="main">
        <div className="content-box">

          <div className="progress-section">
            <div className="progress-title">zadatci iz oduzimanja</div>
            <div className="progress-status">0/10 riješeno</div>
            <div className="progress-buttons">
              <button className="action-button">zbrajanje</button>
              <button className="action-button">rastav</button>
            </div>
          </div>

          <div className="question-card">
            <div className="question-content">
              <div className="question-text">
                <h2 className="question-title">1. zadatak</h2>
                <div className="question-options">
                  <div>a) ponudeni odgovori</div>
                  <div>b)</div>
                  <div>c)</div>
                </div>
              </div>
              <div className="arrow-graphics">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 30 L40 30 M40 30 L30 20 M40 30 L30 40"
                    stroke="white"
                    strokeWidth="3"
                  />
                </svg>
              </div>
              <button className="help-button">treba ti pomoć?</button>
            </div>
          </div>

          <div className="empty-card"></div>
          <div className="empty-card"></div>
        </div>
      </main>
    </div>
  );
}
