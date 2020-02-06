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

module.exports = {
  postMethod,
  getMethod
}