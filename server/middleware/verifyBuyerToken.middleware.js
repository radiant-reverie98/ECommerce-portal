const express = require('express')
const jwt = require('jsonwebtoken')


const verifyBuyerToken = (req,res,next) =>{
    let token = req.cookies.buyer_token;

    if (!token) {
    return res.status(401).json({ message: 'Unauthorized - token missing' });
  }
  jwt.verify(token, process.env.JWT_BUYER_SECRET, (err, data) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden - invalid token' });
      }
  
      req.user = data; // attach full payload if needed
      req.userId = data.id;
     
      next();
    });
}

module.exports = verifyBuyerToken