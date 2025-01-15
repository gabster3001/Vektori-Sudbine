
import React from 'react';
import './Pocetna.css';
import Header from '../../components/Header/Header';

const Pocetna: React.FC = () => {
  const username = "Korisnik";
    const level = 3;
  return (

    <div className="login-page">
      <Header username={username} level={level} />
      
      

      
      <main className="content">
        
        <div className="info-box">
          <p>Nauči i izvježbaj zbrajanje i oduzimanje vektora i rastav sila</p>
        </div>
       
        <div className="auth-box">
          <div className="login-section">
            <h2>Log in</h2>
            <form>
              <input type="email" placeholder="email" required />
              <input type="password" placeholder="lozinka" required />
              <button type="submit">Log in</button>
            </form>
            <button className="google-login">google log in</button>
          </div>

          <div className="divider"></div>

          <div className="register-section">
            <h2>Register</h2>
            <p>Još nemaš račun?</p>
            <a href="/registracija" className="register-button">Registracija</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pocetna;