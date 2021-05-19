const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/tasks-api");
const bodyParser = require("body-parser");
const Task = require("./tasksModel");

const app = express();
app.use(bodyParser.json());

// check for cors
app.use(cors({
  domains: '*',
  methods: "*"
}));


app.get('/tipocambio', function (req, res) {
  res.send(`{
    "TipoCompraDolares" : "608",
    "TipoVentaDolares" : "621",
    "TipoCompraEuros" : "731.85",
    "TipoVentaEuros" : "761.9"
  }`);
});

app.post('/tasks', function (req, res) {

  const task = new Task();

  task.title = req.body.title;;
  task.description = req.body.description;;

  if (task.title && task.description) {
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
});


app.listen(3000, () => console.log(`Example app listening on port 3000!`))
