// Initialize Express application
const express = require('express');
const app = express();

// Import routes
const courseRouter = require('./routes/course.route');

app.use(express.json());
app.use('/api/courses', courseRouter);

// Example route: http://localhost:PORT/api/courses

module.exports = app;
