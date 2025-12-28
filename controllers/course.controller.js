let courses = require('../data');
const Course = require('../models/course.model.js');

const getCourses = async (req, res) => {
  res.status(200).json({ success: true, data: courses });
}

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    // Validate if course exists
    if (!course) {
      return res.status(404).json({
        success: false,
        message: `No course with given id`
      });
    }

    res.status(200).json({
      success: true, 
      message: "Course retrieved successfully",
      data: course
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid course id"
    });
  }
}

const createCourse = async (req, res) => {
  try {
    const { name: newName } = req.body;
    // Validation
    if (!newName) {
      return res.status(400).json({
        success: false,
        message: "Course name is required"
      });
    }
    
    // Check if the course is already exist
    const existing = await Course.findOne({ name: newName });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Course already exists"
      });
    }

    // Create a new course
    const course = await Course.create({
      id: courses.length + 1,
      name: newName
    });
    res.status(201).json({
      success: true,
      message: "New course is created successfully",
      data: course
    })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name: newName } = req.body;

    // Validation
    if (!newName) {
      return res.status(400).json({
        success: false,
        message: `New course name is required`
      });
    }
    
    // Update the course
    const course = await Course.findByIdAndUpdate(
      id,
      { name: newName },
      { new: true, runValidators: true }
    )

    // Validate if course exists
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "No course with given id"
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid course id"
    });
  }
}

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course =  await Course.findByIdAndDelete(id);

    // Validate if course exists
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "No course with given id"
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
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
};