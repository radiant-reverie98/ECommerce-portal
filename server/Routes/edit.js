const db = require('../Database/register');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('../verifyToken');

router.put('/editUser', verifyToken, async (req, res) => {
    try{
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);
        const userId = decoded.id;

        const { name, email, contact, city, state } = req.body;
        const sql = ` UPDATE register 
      SET name = ?, email = ?, contact = ?, city = ?, state = ?
      WHERE id = ?`
      db.query(sql,[name,email,contact,city,state,userId], (err, result) => {
        if (err) {
        console.error("Update error:", err);
        return res.status(500).json({ message: "Database error" });
      }
      return res.status(200).json({ message: "Profile updated successfully" });
    });

    }catch(err){
        console.error("Error in editUser route:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

//get user details

router.get('/getUserData',verifyToken,async(req,res)=>{
    try{
        const decoded = jwt.verify(req.cookies.token,process.env.JWT_SECRET);
        const userId = decoded.id;

        const sql = `SELECT * FROM register WHERE id = ?`;
        db.query(sql, [userId], (err, result) => {
            if (err) {
                console.error("Error fetching user data:", err);
                return res.status(500).json({ message: "Database error" });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json(result[0]);
        });
    }catch(err){
        console.error("Error in getUserData route:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


module.exports = router;