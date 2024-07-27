const express = require('express');
const app = express();
const port = 3000;

// Middleware function
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

// Define routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Add more routes here...

app.listen(port, () => {
    console.log(`Express server running at http://localhost:${port}/`);
});
