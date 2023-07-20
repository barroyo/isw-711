const Course = require("../models/courseModel");

/**
 * Get all courses or one
 *
 * @param {*} req
 * @param {*} res
 */
const courseGet = async (req) => {
  // if an specific teacher is required
  await Course.find()
    .then( (course) => {
      return course;
    })
    .catch(err => {
      return { error: "Course doesnt exist" }
    });
};

module.exports = {
  courseGet
}