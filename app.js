const express = require('express');
require('dotenv').config({ path: './.env' });

// Create an Express.js instance
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Import data from data.js
const courses = require('./data');

// Define a simple GET endpoint
app.get('/', (req, res) => {
    res.send("<h1>WELCOME TO THE PAGE</h1>");
});

app.get('/courses', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Data is retrieved successfully",
        data: courses
    });
});

app.get('/courses/:courseID', (req, res) => {
    const { courseID } = req.params;
    const course = courses.find((course) => course.id === Number(courseID));
    // Validate course search result
    if (!course) {
        return res.status(404).json({
            success: false,
            message: `No course with ID ${courseID}`
        });
    }

    res.status(200).json({
        success: true,
        message: `Course ${courseID} is retrieved successfully`,
        data: course
    });
});

app.post('/courses', (req, res) => {
    const newID = courses.length ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    const { name: courseName } = req.body;
    // Validate request body
    if (!courseName) {
        return res.status(400).json({
            success: false,
            message: "courseName is required"
        });
    }

    const newCourse = { id: newID, name: courseName };
    courses.push(newCourse);
    res.status(201).json({
        success: true,
        message: "Data is created successfully",
        data: courses
    });
});

app.put('/courses/:courseID', (req, res) => {
    const { courseID } = req.params;
    const { name: courseName } = req.body;
    const course = courses.find((course) => course.id === Number(courseID));
    // Validate course search
    if (!course) {
        return res.status(404).json({
            success: false,
            message: `No course with ID ${courseID}`
        });
    }

    // Validate request body
    if(!courseName) {
        return res.status(400).json({
            success: false,
            message: "courseName is required"
        });
    }
    course.name = courseName;
    
    res.status(200).json({
        success: true,
        message: "Data is updated successfully",
        data: courses
    });
});

app.delete('/courses/:courseID', (req, res) => {
    const { courseID } = req.params;

    // Validate the route parameter
    if (Number.isNaN(courseID)) {
        return res.status(400).json({
            success: false,
            message: "courseID must be a number"
        });
    }
    
    // Search for course
    const course = courses.find((course) => course.id === Number(courseID));
    if (!course) {
        return res.status(404).json({
            success: false,
            message: `No course with ID ${courseID}`
        });
    }

    // Remove the course with queried ID
    const newCourses = courses.filter((course) => course.id !== Number(courseID));

    return res.status(200).json({
        success: true,
        message: `Course ${courseID} is deleted successfully`,
        data: newCourses
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});