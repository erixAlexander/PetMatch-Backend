const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    console.log(req.headers)
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ message: "You are unauthorized" });
    const token = authHeader.split(' ')[1];
    
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN,
        (err, decoded) => {
            if (err) return res.sendStatus(403); 
            console.log(decoded.UserInfo)
            req.user = decoded.UserInfo.username;
            next();
        }
    );
}

module.exports = verifyJWT