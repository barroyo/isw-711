const Teacher = require("../models/teacher");

/**
 * Creates a teacher
 *
 * @param {*} req
 * @param {*} res
 */
const teacherPost = async (req, res) => {
  let teacher = new Teacher(req.body);
  await teacher.save()
    .then(teacher => {
      res.status(201); // CREATED
      res.header({
        'location': `/api/teachers/?id=${teacher.id}`
      });
      res.json(teacher);
    })
    .catch( err => {
      res.status(422);
      console.log('error while saving the teacher', err);
      res.json({
        error: 'There was an error saving the teacher'
      });
    });
};

module.exports = {
  teacherPost,
}