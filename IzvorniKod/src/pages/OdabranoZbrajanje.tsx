import React from "react";
import Button from "../components/Button"; // Import Button component
import InteractiveCanvas from "../components/InteractiveCanvas"; // Import the new InteractiveCanvas component
import Header from "../components/Header"; // Import the new Header component
import "./OdabranoZbrajanje.css";

export default function OdabranoZbrajanje() {
    // Example username and level (these could come from props, state, or a backend API)
    const username = "Korisnik";
    const level = 3;

    // Callback for handling vector changes
    const handleVectorsChange = (vectors: any) => {
        console.log("Updated vectors:", vectors);
    };

    return (
        <div className="zbrajanje-container">
            {/* Header */}
            <Header username={username} level={level} />

            {/* Back Button and Title Section */}
            <div className="back-button-container">
                <Button text="<" route="/" /> {/* Back button */}
                <h2>Zbrajanje vektora</h2>
            </div>

            {/* Content description */}
            <div className="opis">
                <h2>Što je zbrajanje vektora?</h2>
                <p>
                    Zbrajanje vektora je operacija kombiniranja dva ili više vektora u
                    jedan rezultat. Može se raditi u jednoj ili dvije dimenzije.
                </p>
            </div>

            {/* Buttons for interaction */}
            <div className="gumbi">
                <Button text="Oduzimanje" route="/oduzimanje" />
                <Button text="Rastav" route="/rastav" />
            </div>

            {/* Interactive canvas */}
            <div className="interaktivni-prozor">
                <InteractiveCanvas
                    width={400}
                    height={400}
                    onVectorsChange={handleVectorsChange}
                />
            </div>

            {/* Tasks button */}
            <div className="zadaci">
                <Button text="Želiš li provježbati naučeno?" route="/zadaci" />
            </div>
        </div>
    );
}
