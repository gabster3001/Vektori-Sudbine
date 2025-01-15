import React from "react";
import { useAuth } from "../../components/AuthContext";

const Izbornik: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Dobrodošli na Izbornik!</h1>
      <button onClick={logout}>Odjava</button>
    </div>
  );
};

export default Izbornik;
