const express = require('express');
require('dotenv').config();

// Create an Express.js instance
const app = express();
const PORT = process.env.PORT || 3000;

// Define a simple GET endpoint
app.get('/', (req, res) => {
    res.send("<h1>WELCOME TO THE PAGE</h1>");
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});