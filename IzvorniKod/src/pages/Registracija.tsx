import Header from "../components/Header";
import Register from "../components/Register";
import React from "react";

export default function Registracija() {
    return (
        <div>
            <Header username={""} level={0} />
            <Register />
        </div>
    );
}