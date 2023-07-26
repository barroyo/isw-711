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
const courseGet = (req, res) => {
  return courseModel.find((error, courses) => {
    if(error) {
      console.log('there was an error', error);
    }
    return courses;
  }).populate('teacher').exec();
};

module.exports = {
  courseGet
}