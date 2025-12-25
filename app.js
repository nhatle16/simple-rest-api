const express = require('express');
require('dotenv').config({ path: './.env' });

// Create an Express.js instance
const app = express();
const PORT = process.env.PORT || 3000;

// Import data from data.js
const courses = require('./data');

// Define a simple GET endpoint
app.get('/', (req, res) => {
    res.send("<h1>WELCOME TO THE PAGE</h1>");
});

app.get('/courses', (req, res) => {

});

app.get('/courses/:courseID', (req, res) => {

});

app.post('/courses', (req, res) => {

});

app.put('/courses/:courseID', (req, res) => {

});

app.patch('/courses/:courseID', (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});