const courseModel = require("../models/courseModel");

/**
 * Get all courses or one
 *
 * @param {*} req
 * @param {*} res
 */
// const courseGet = (req) => {
//   return Course.find()
//     .then( (course) => {
//       console.log('here', course);
//       return course;
//     })
//     .catch(err => {
//       return { error: "Course doesnt exist" }
//     });
// };

/**
 * Get all courses or one
 *
 * @param {*} req
 * @param {*} res
 */
const courseGetAll = (req, res) => {
  return courseModel.find((error, courses) => {
    if (error) {
      console.log('there was an error', error);
      return error;
    }
    return courses;
  }).populate('teacher').exec();
};

/**
 * Get all courses or one
 *
 * @param {*} req
 * @param {*} res
 */
const courseSearch = (params) => {
  return courseModel.find(
    {
      "name": { $regex: `${params.name}`, $options: 'i' }
    }, (error, courses) => {
    if (error) {
      console.log('there was an error', error);
      return error;
    }
    return courses;
  }).populate('teacher').exec();
};

module.exports = {
  courseGetAll,
  courseSearch
}