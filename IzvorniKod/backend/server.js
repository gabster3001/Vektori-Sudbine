const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' })); // Replace with your frontend URL

// Connect to the database
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

db.connect((error) => {
  if (error) {
    console.error("Error connecting to the database:", error);
  } else {
    console.log("Connected to the MySQL database.");
  }
});

// Define API routes
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Fetch all users from the 'users' table
app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results); // Return results in JSON format
  });
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  // Log the received data to verify if 'email' is correctly being passed
  console.log("Received data:", { username, email, password });

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: "Error hashing password" });
    }

    // SQL query to insert user data
    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(query, [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("Error inserting user:", err);
        return res.status(500).json({ message: "Error inserting user" });
      }
      console.log("User inserted successfully:", result);
      res.status(200).json({ message: "User registered successfully" });
    });
  });
});


// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  // Query to check the user in the database
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error.", error: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = results[0];

    // Check the password (in a real project, you should use bcrypt to compare hashed passwords)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Successful login
    res.json({
      message: "Login successful.",
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
