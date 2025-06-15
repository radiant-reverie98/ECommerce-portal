const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../Database/register");
const verifyBuyerToken = require("../middleware/verifyBuyerToken.middleware");
const router = express.Router();


// Register buyer
router.post("/registerBuyer", async (req, res) => {
  try {
    const { buyer_name, buyer_username, buyer_email, buyer_password } = req.body;

    if (!buyer_name || !buyer_username || !buyer_email || !buyer_password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const sql1 = `SELECT * FROM buyer WHERE buyer_username = ?`;
    db.query(sql1, [buyer_username], async (err, result) => {
      if (err) {
        return res.status(500).json({ message: err });
      }
      if (result.length > 0) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(buyer_password, salt);

      const sql2 = `INSERT INTO buyer (buyer_name, buyer_username, buyer_email, buyer_password) VALUES (?,?,?,?)`;
      db.query(sql2, [buyer_name, buyer_username, buyer_email, hashPassword], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });

        const token = jwt.sign(
          { id: result.insertId, username: buyer_username },
          process.env.JWT_BUYER_SECRET,
          { expiresIn: "1h" }
        );

        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 3600000,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });

        return res.status(201).json({ message: "User created successfully" });
      });
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});


// Login buyer

router.post('/loginBuyer',async(req,res)=>{
  try{
    const {buyer_username,buyer_password} = req.body;
    const sql = `SELECT * FROM buyer WHERE buyer_username = ?`
    db.query(sql,[buyer_username],async (err,result)=>{
      if(err) return res.status(500).json({message: err.message})
      if(result.length === 0) return res.status(400).json({message : "User not found"})
      
      const user = result[0];
      const isMatch = await bcrypt.compare(buyer_password, user.buyer_password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
      const token = jwt.sign({ id: user.buyer_id, username: user.buyer_username }, process.env.JWT_SECRET, { expiresIn: '1h' });
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
          id: user.buyer_id,
          name: user.buyer_name,
          username: user.buyer_username,
          email: user.buyer_email
        }
      });
      
    })
  }catch(err){
    console.error("Login error:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


// Logout User

router.get('/logoutBuyer', (req, res) => {
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





module.exports = router