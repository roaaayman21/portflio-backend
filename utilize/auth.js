const jwt =require('jsonwebtoken');
require('dotenv').config();
const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');

    // Check if the header is undefined or null
    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const verified = jwt.verify(token, process.env.secret_key);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

module.exports=authMiddleware;