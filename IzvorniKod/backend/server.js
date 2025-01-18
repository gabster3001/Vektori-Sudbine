require('dotenv').config(); // Učitavamo vrednosti iz .env fajla
const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

// Povezivanje sa MySQL bazom podataka koristeći vrednosti iz .env fajla
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

// Middleware za autentifikaciju JWT tokena
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.sendStatus(403);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

// Ruta za dobavljanje korisničkog imena
app.get('/api/get-username', authenticateToken, (req, res) => {
  const userEmail = req.user.email;  // Dobijanje email-a iz JWT tokena

  const query = 'SELECT username FROM users WHERE email = ?';
  
  db.query(query, [userEmail], (err, results) => {
    if (err) {
      return res.status(500).send('Error querying the database');
    }

    if (results.length > 0) {
      return res.json({ username: results[0].username });
    } else {
      return res.status(404).send('User not found');
    }
  });
});

// Pokretanje servera
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
