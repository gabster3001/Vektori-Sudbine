import React from "react";
import Header from "../../components/Header/Header";
import Register from "../../components/Register/Register";


export default function Registracija() {
    const username = "Korisnik";
    const level = 3;
    return (
        <div className="registracija-page">
            <Header username={username} level={level} />
            <Register />
        </div>
    );
}