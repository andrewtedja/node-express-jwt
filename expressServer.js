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

// CRUD operations
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

app.listen(port, () => {
    console.log(`Express server running at http://localhost:${port}/`);
});
