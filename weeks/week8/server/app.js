const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/todo-api");
const cors = require("cors");
const bodyParser = require("body-parser");
const Session = require("./models/sessionsModel");

const {
  postMethod,
  getMethod,
  patchMethod,
} = require("./controllers/todoController.js");

const {
  saveSession,
  destroySession
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


/**
 * Login for a token based authentication
 */
app.post("/api/session", function (req, res) {
  if (req.body.username && req.body.password &&
    req.body.username === 'admin' && req.body.password === 'password') {
    // insert token to the session table
    const token = saveSession(req.body.username);
    res.send({
      token
    });
  } else {
    res.status(401);
    res.send({
      error: "Unauthorized "
    });
  }
});

/**
 * Logout session
 */
app.delete("/api/session", function (req, res) {
  if (req.headers["authorization"]) {
    const token = req.headers['authorization'].split(' ')[1];
    // insert token to the session table
    destroySession(token);
    res.status(204).send({});
  } else {
    res.status(401);
    res.send({
      error: "Unauthorized "
    });
  }
});

// Token based Auth Middleware
app.use(function (req, res, next) {
  if (req.headers["authorization"]) {
    const token = req.headers['authorization'].split(' ')[1];
    try {
      //validate if token exists in the database
      Session.findOne({ token }, function (error, session) {
        if (error) {
          console.log('error', error);
          res.status(401);
          res.send({
            error: "Unauthorized "
          });
        }
        if (session) {
          next();
          return;
        } else {
          res.status(401);
          res.send({
            error: "Unauthorized "
          });
        }
      });
    } catch (e) {
      res.status(422);
      res.send({
        error: "There was an error: " + e.message
      });
    }
  } else {
    res.status(401);
    res.send({
      error: "Unauthorized "
    });
  }
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