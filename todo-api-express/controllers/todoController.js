const Task = require("../../todo-api-express/models/taskModel");

const postMethod = (req, res) => {
  var task = new Task();

  task.title = req.body.title;
  task.detail = req.body.detail;

  task.save(function (err) {
    if (err) {
      res.status(422);
      console.log('error while saving the task', err)
      res.json({
        error: 'There was an error saving the task'
      });
    }
    res.status(201);
    res.header({
      'location': `http://localhost/api/tasks/${task.id}`
    });
    res.json(task);
  });
};

const getMethod = (req, res) => {
  Task.find(function (err, tasks) {
    if (err) {
      res.send(err);
    }
    res.json(tasks);
  });
};

const patchMethod = (req, res) => {
  // get task by id
  const task = Task.findById(req.query.id, function (err, task) {
    if (err) {
      res.json({ error: err })
    }
    return task;
  });


  // update the task object
  task.title = req.body.title ? req.body.title : oldTask.title;
  task.detail = req.body.detail ? req.body.defail : oldTask.detail;


  task.save(function (err) {
    if (err) {
      res.status(422);
      console.log('error while saving the task', err)
      res.json({
        error: 'There was an error saving the task'
      });
    }
    res.status(200);
    res.json(task);
  });
};

module.exports = {
  postMethod,
  getMethod,
  patchMethod
}