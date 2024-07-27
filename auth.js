const jwt = require('jsonwebtoken');

const secret_key = 'shhhhhhared-secret';

function generateToken(user) {
    return jwt.sign(user, secret_key, { expiresIn: '1h' });
}

function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token, secret_key, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
}

module.exports = { generateToken, authenticateToken };