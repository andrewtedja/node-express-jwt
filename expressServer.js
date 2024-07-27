const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Middleware function
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

// CRUD
app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    try {
        const result = await db.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
      const result = await db.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
      if (result.rows.length === 0) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(result.rows[0]);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Login route (mock only)
app.post('/login', (req, res) => {
  const user = { id: 1, username: 'testuser' };
  const token = generateToken(user);
  res.json({ token });
});


// Protected routes
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected GET route', user: req.user });
});

app.post('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected POST route', data: req.body });
});

app.put('/protected/:id', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected PUT route', id: req.params.id, data: req.body });
});

app.delete('/protected/:id', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected DELETE route', id: req.params.id });
});

app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}/`);
});