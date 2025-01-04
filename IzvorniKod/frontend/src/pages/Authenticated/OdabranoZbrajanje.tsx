import React from "react";
import Button from "../../components/Button";
import InteractiveCanvas from "../../components/InteractiveCanvas";
import Header from "../../components/Header";
import "./OdabranoZbrajanje.css";

export default function OdabranoZbrajanje() {
  const username = "Korisnik";
  const level = 3;

  const handleVectorsChange = (vectors: any) => {
    console.log("Updated vectors:", vectors);
  };

  return (
    <div className="zbrajanje-container">
      <Header username={username} level={level} />

      <div className="back-button-container">
        <Button text="<" route="/" />
        <div className="title-text">Zbrajanje vektora</div>
        <div className="gumbi">
          <Button text="Oduzimanje" route="/oduzimanje" />
          <Button text="Rastav" route="/rastav" />
        </div>
      </div>

      <div className="opis">
        <h2>Što je zbrajanje vektora?</h2>
        <p>
          Zbrajanje vektora je operacija kombiniranja dva ili više vektora u
          jedan rezultat. Može se raditi u jednoj ili dvije dimenzije.
        </p>
      </div>

      <div className="interaktivni-prozor">
        <InteractiveCanvas
          width={400}
          height={400}
          onVectorsChange={handleVectorsChange}
        />
      </div>

      <div className="zadaci">
        <Button text="Želiš li provježbati naučeno?" route="/zadaci" />
      </div>
    </div>
  );
}
