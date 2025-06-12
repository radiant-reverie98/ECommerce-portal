const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Try from cookies first, then fallback to Authorization header
  let token = req.cookies.token;
   console.log("Cookie token",req.cookies.token)
    console.log("Auth header",req.headers.authorization)

  

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden - invalid token' });
    }

    req.user = data; // attach full payload if needed
    req.userId = data.id;
   
    next();
  });
};

module.exports = verifyToken;
