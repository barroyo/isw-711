const Course = require("../models/courseModel");

/**
 * Get all courses or one
 *
 * @param {*} args
 */
const courseGet = (args) => {
  const { id } = args || {};
  if (id) {
    return Course.findById(id);
  } else {
    return Course.find();
  }
};

/**
 * Create a course
 *
 * @param {*} args
 * @returns
 */
const courseCreate = (args) => {
  const { name, description, price } = args;
  const course = new Course({ name, description, price });
  return course.save();
}

module.exports = {
  courseGet,
  courseCreate
}