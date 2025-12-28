// Initialize a Router instance and import controller functions
const express = require('express');
const router = express.Router();
const { 
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse 
} = require('../controllers/course.controller');

// Establish route by chaining
router.route('/')
  .get(getCourses)
  .post(createCourse);

router.route('/:id')
  .get(getCourseById)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;