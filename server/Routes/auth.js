const express = require('express');
const router = express.Router();
const app = express();
const regUser = require('../Database/register.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  
const db = require('../Database/register.js');



router.post('/registerUser', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    
    db.query('SELECT * FROM register WHERE username = ?', [username], async (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

     
      const insertQuery = 'INSERT INTO register (name, username, email, password) VALUES (?, ?, ?, ?)';
      db.query(insertQuery, [name, username, email, hashedPassword], (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        return res.status(201).json({ message: 'User registered successfully',
            user : {
                id: result.insertId,
                name,
                username,
                email,
                password : hashedPassword
            }
         });
      });

    });
    const token = jwt.sign({username}, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token',token,{
        httpOnly: true,
        maxAge: 3600000, 
        secure: false,
        sameSite: 'lax'
    })

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Login User
router.post('/loginUser', async (req, res) => {
    try {
        const { username, password } = req.body;
        const sql = 'SELECT * FROM register WHERE username = ?';
        regUser.query(sql, [username], async (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            const user = results[0];
            const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000, sameSite: 'lax',secure: process.env.NODE_ENV === 'production' });
            res.json({ message: 'Login successful', token,
                user : {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                }
             });
        });
    }
    catch(err){
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Logout User
router.get('/logoutUser', (req, res) => {
    try{
        res.clearCookie('token', {
        httpOnly: true,
        maxAge: 3600000,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
        }).status(200).json({message:"User logged out successfully"});
    }catch(err){
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

