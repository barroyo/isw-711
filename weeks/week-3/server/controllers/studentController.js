const Student = require("../models/studentModel");

/**
 * Creates a Student
 *
 * @param {*} req
 * @param {*} res
 */
const studentPost = (req, res) => {
  var student = new Student();

  student.username = req.body.username;
  student.firstName = req.body.firstName;
  student.lastName = req.body.lastName;

  if (student.username && student.firstName && student.lastName) {
    student.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the student', err)
        res.json({
          error: 'There was an error saving the student'
        });
      }
      res.status(201);//CREATED
      res.header({
        'location': `http://localhost:3000/api/students/?id=${student.id}`
      });
      res.json(student);
    });
  } else {
    res.status(422);
    console.log('error while saving the Student')
    res.json({
      error: 'No valid data provided for Student'
    });
  }
};

/**
 * Get all Students
 *
 * @param {*} req
 * @param {*} res
 */
const studentGet = (req, res) => {
  // if an specific Student is required
  if (req.query && req.query.id) {
    Student.findById(req.query.id, function (err, student) {
      if (err) {
        res.status(404);
        console.log('error while queryting the student', err)
        res.json({ error: "student doesnt exist" })
      }
      res.json(student);
    });
  } else {
    // get all Students
    Student.find(function (err, students) {
      if (err) {
        res.status(422);
        res.json({ "error": err });
      }
      res.json(students);
    });

  }
};

/**
 * Delete one Student
 *
 * @param {*} req
 * @param {*} res
 */
const studentDelete = (req, res) => {
  // if an specific Student is required
  if (req.query && req.query.id) {
    Student.findById(req.query.id, function (err, student) {
      if (err) {
        res.status(500);
        console.log('error while queryting the student', err)
        res.json({ error: "student doesnt exist" })
      }
      //if the student exists
      if(student) {
        student.remove(function(err){
          if(err) {
            res.status(500).json({message: "There was an error deleting the student"});
          }
          res.status(204).json({});
        })
      } else {
        res.status(404);
        console.log('error while queryting the student', err)
        res.json({ error: "student doesnt exist" })
      }
    });
  } else {
    res.status(404).json({ error: "You must provide a Student ID" });
  }
};

/**
 * Updates a Student
 *
 * @param {*} req
 * @param {*} res
 */
const studentPatch = (req, res) => {
  // get Student by id
  if (req.query && req.query.id) {
    Student.findById(req.query.id, function (err, student) {
      if (err) {
        res.status(404);
        console.log('error while queryting the student', err)
        res.json({ error: "student doesnt exist" })
      }

      // update the student object (patch)
      student.username = req.body.username ? req.body.username : student.username;
      student.firstName = req.body.firstName? req.body.firstName : student.firstName;
      student.lastName = req.body.lastName? req.body.lastName : student.lastName;
      // update the student object (put)
      // student.title = req.body.title
      // student.detail = req.body.detail

      student.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the student', err)
          res.json({
            error: 'There was an error saving the student'
          });
        }
        res.status(200); // OK
        res.json(student);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "Student doesnt exist" })
  }
};

module.exports = {
  studentGet,
  studentPost,
  studentPatch,
  studentDelete
}