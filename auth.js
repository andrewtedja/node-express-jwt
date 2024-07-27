const jwt = require('jsonwebtoken');

const secret_key = 'secret_key';

function generateToken(user) {
    return jwt.sign(user, secret_key, { expiresIn: '1h' });
}

function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token, secret_key, (err, user) => {
        if (err) return res.status(403);
        req.user = user;
        next();
    });
}

module.exports = { generateToken, authenticateToken };

// Protected routes for each HTTP method
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
  });
  
  router.post('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Protected POST route', data: req.body });
  });
  
  router.put('/protected/:id', authenticateToken, (req, res) => {
    res.json({ message: 'Protected PUT route', id: req.params.id, data: req.body });
  });
  
  router.delete('/protected/:id', authenticateToken, (req, res) => {
    res.json({ message: 'Protected DELETE route', id: req.params.id });
  });