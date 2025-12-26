let courses = require('../data');
const Course = require('../models/course.model.js');

const getCourses = async (req, res) => {
  res.status(200).json({ success: true, data: courses });
}

const getCourseByName = async (req, res) => {
  try {
    const { name: courseName } = req.body;
    // Validation
    const course = await Course.findOne({
      name: courseName
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: `No course with given name`
      });
    }

    res.status(200).json({
      success: true, 
      message: `Course is retrieved successfully`,
      data: course
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

const createCourse = async (req, res) => {
  try {
    const { name: courseName } = req.body;
    // Validation
    if (!courseName) {
      return res.status(400).json({
        success: false,
        message: "Course name is required"
      });
    }
    
    // Check if the course is already exist
    const existing = await Course.findOne({ name: courseName });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Course already exists"
      });
    }

    // Create a new course
    const course = await Course.create({ name: courseName });
    res.status(201).json({
      success: true,
      message: "New course is created successfully",
      data: course
    })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

const updateCourseName = async (req, res) => {
  try {
    const { name: courseName } = req.body;
    const course = Course.findOne({
      name: courseName
    });

    // Validation
    if (!course) {
      return res.status(404).json({
        success: false,
        message: `No course with given name`
      });
    }

    // Update course name
    course.name = courseName;

    res.status(200).json({
      success: true,
      message: "Course name is updated successfully",
      data: course
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

const deleteCourse = async (req, res) => {
  try {
    const { name: courseName } = req.params;
    const course =  await Course.findOneAndDelete({ name: courseName });
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "No course with given name"
      });
    }
    res.status(204).json({
      success: true,
      message: "Course is deleted successfully"
    })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getCourses,
  getCourseByName,
  createCourse,
  updateCourseName,
  deleteCourse
};