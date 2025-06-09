const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    jwt.verify(token,process.env.JWT_SECRET, async(err, data) => {
        if(err){
            res.status(403).json({ message: 'Forbidden' });
            return;
        }
        req.userId = data.id 
        next();

    })
}

module.exports = verifyToken;