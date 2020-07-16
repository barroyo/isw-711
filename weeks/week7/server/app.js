const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/todo-api");
const {
  base64decode
} = require('nodejs-base64');
const cors = require("cors");
const bodyParser = require("body-parser");

const {
  postMethod,
  getMethod,
  patchMethod,
} = require("./controllers/todoController.js");

const {
  saveSession
} = require("./controllers/sessionController.js");

// check for cors
app.use(cors());

// parses the body
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

//basic authentication
app.use(function (req, res, next) {
  if (req.headers["authorization"]) {
    // Basic VVROOlBhc3N3b3JkMQ==

    const authBase64 = req.headers['authorization'].split(' ');
    console.log('authBase64:', authBase64);
    const userPass = base64decode(authBase64[1]);
    console.log('userPass:', userPass);
    const user = userPass.split(':')[0];
    const password = userPass.split(':')[1];

    if (user === 'admin' && password == '1234') {
      // saveSession('admin');
      next();
      return;
    }
  }
  res.status(401);
  res.send({
    error: "Unauthorized"
  });
});


// handle the routes
app.get("/api/tasks", getMethod);
app.post("/api/tasks", postMethod);
app.patch("/api/tasks", patchMethod);
app.put("/api/tasks", patchMethod);

// handle 404
app.use(function (req, res, next) {
  res.status(404);
  res.send({
    error: "Not found"
  });
  return;
});

app.listen(3000, () => console.log("TODO API is listening on port 3000!"));