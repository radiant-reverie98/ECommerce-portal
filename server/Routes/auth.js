const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../Database/register.js');

// Register User
router.post('/registerUser', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Check if username already exists
    db.query('SELECT * FROM register WHERE username = ?', [username], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length > 0) return res.status(400).json({ message: 'Username already exists' });

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Insert new user
      const insertQuery = 'INSERT INTO register (name, username, email, password) VALUES (?, ?, ?, ?)';
      db.query(insertQuery, [name, username, email, hashedPassword], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        const userId = result.insertId;

        //  Generate JWT with user ID
        const token = jwt.sign({ id: userId, username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set token in cookie
        res.cookie('token', token, {
          httpOnly: true,
          maxAge: 3600000, // 1 hour
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        });

        return res.status(201).json({
          message: 'User registered successfully',
          token,
          user: {
            id: userId,
            name,
            username,
            email
          }
        });
      });
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//  Login User
router.post('/loginUser', async (req, res) => {
  try {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM register WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: 'User not found' });

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      // ✅ Generate JWT with user ID
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Set token in cookie
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 3600000,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email
        }
      });
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//  Logout User
router.get('/logoutUser', (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
