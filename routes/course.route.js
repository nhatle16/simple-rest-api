// Initialize a Router instance and import controller functions
const express = require('express');
const router = express.Router();
const { 
  getCourses,
  getCourseByName,
  createCourse,
  updateCourseName,
  deleteCourse 
} = require('../controllers/course.controller');

// Establish route by chaining
router.route('/')
  .get(getCourses)
  .post(createCourse);

router.route('/:courseName')
  .get(getCourseByName)
  .put(updateCourseName)
  .delete(deleteCourse);

module.exports = router;