const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

db.connect((error) => {
  if (error) console.error("Error connecting to the database:", error);
  else console.log("Connected to the MySQL database.");
});

function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided." });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token." });
    req.user = user;
    next();
  });
}

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const checkQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error." });

    if (results.length > 0) {
      return res.status(400).json({ message: "Email already in use." });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: "Error hashing password." });
    
      const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
      db.query(query, [username, email, hashedPassword], (err) => {
        if (err) return res.status(500).json({ message: "Error inserting user." });
        res.status(200).json({ message: "User registered successfully." });
      });
    });
    
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error." });

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = results[0];

    // Prvo pokušavamo s bcrypt.compare za hashirane lozinke
    bcrypt.compare(password, user.password, async (err, isMatch) => {
      if (err) {
        console.error("Error in bcrypt.compare:", err);
        return res.status(500).json({ message: "Error checking password." });
      }

      if (!isMatch) {
        // Ako bcrypt ne uspije, provjeravamo da li je lozinka plain text
        if (user.password === password) {
          console.log("Plain text password detected for user:", user.email);

          // Hashiramo plain text lozinku i ažuriramo bazu podataka
          const hashedPassword = await bcrypt.hash(password, 10);
          db.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, user.id], (err) => {
            if (err) {
              console.error("Error updating password for user:", user.id, err);
            } else {
              console.log("Password successfully updated for user:", user.email);
            }
          });

          // Generiramo token za uspješnu prijavu
          const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
          return res.json({ message: "Login successful.", token, user: { id: user.id, name: user.username, email: user.email } });
        } else {
          // Ako lozinka nije ni hashirana ni plain text koja se poklapa
          return res.status(401).json({ message: "Invalid email or password." });
        }
      } else {
        // Ako je lozinka ispravna i hashirana
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login successful.", token, user: { id: user.id, name: user.username, email: user.email } });
      }
    });
  });
});


app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route.", user: req.user });
});

app.get('/tasks', (req, res) => {
  const taskType = req.query.type; // Npr. 'zbrajanje'
  const query = taskType
    ? "SELECT * FROM tasks WHERE type = ?"
    : "SELECT * FROM tasks";

  db.query(query, taskType ? [taskType] : [], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error." });
    res.json(results);
  });
});



app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
