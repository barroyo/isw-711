const Task = require("../models/taskModel");

/**
 * Creates a task
 *
 * @param {*} req
 * @param {*} res
 */
const taskPost = (req, res) => {
  var task = new Task();

  task.title = req.body.title;
  task.detail = req.body.detail;

  if (task.title && task.detail) {
    task.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the task', err)
        res.json({
          error: 'There was an error saving the task'
        });
      }
      res.status(201);//CREATED
      res.header({
        'location': `http://localhost:3000/api/tasks/?id=${task.id}`
      });
      res.json(task);
    });
  } else {
    res.status(422);
    console.log('error while saving the task')
    res.json({
      error: 'No valid data provided for task'
    });
  }
};

/**
 * Get all tasks
 *
 * @param {*} req
 * @param {*} res
 */
const taskGet = (req, res) => {
  // if an specific task is required
  if (req.query && req.query.id) {
    Task.findById(req.query.id, function (err, task) {
      if (err) {
        res.status(404);
        console.log('error while queryting the task', err)
        res.json({ error: "Task doesnt exist" })
      }
      res.json(task);
    });
  } else {
    // get all tasks
    Task.find(function (err, tasks) {
      if (err) {
        res.status(422);
        res.json({ "error": err });
      }
      res.json(tasks);
    });

  }
};

/**
 * Delete one task
 *
 * @param {*} req
 * @param {*} res
 */
const taskDelete = (req, res) => {
  // if an specific task is required
  if (req.query && req.query.id) {
    Task.findById(req.query.id, function (err, task) {
      if (err) {
        res.status(500);
        console.log('error while queryting the task', err)
        res.json({ error: "Task doesnt exist" })
      }
      //if the task exists
      if(task) {
        task.remove(function(err){
          if(err) {
            res.status(500).json({message: "There was an error deleting the task"});
          }
          res.status(204).json({});
        })
      } else {
        res.status(404);
        console.log('error while queryting the task', err)
        res.json({ error: "Task doesnt exist" })
      }
    });
  } else {
    res.status(404).json({ error: "You must provide a task ID" });
  }
};

/**
 * Updates a task
 *
 * @param {*} req
 * @param {*} res
 */
const taskPatch = (req, res) => {
  // get task by id
  if (req.query && req.query.id) {
    Task.findById(req.query.id, function (err, task) {
      if (err) {
        res.status(404);
        console.log('error while queryting the task', err)
        res.json({ error: "Task doesnt exist" })
      }

      // update the task object (patch)
      task.title = req.body.title ? req.body.title : task.title;
      task.detail = req.body.detail ? req.body.detail : task.detail;
      // update the task object (put)
      // task.title = req.body.title
      // task.detail = req.body.detail

      task.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the task', err)
          res.json({
            error: 'There was an error saving the task'
          });
        }
        res.status(200); // OK
        res.json(task);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "Task doesnt exist" })
  }
};

module.exports = {
  taskGet,
  taskPost,
  taskPatch,
  taskDelete
}