const express = require("express");
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/todo-api");
const app = express();
const crypto = require('crypto');
const cors = require("cors");

const bodyParser = require("body-parser");

const {
  postMethod,
  getMethod,
  patchMethod,
} = require("./controllers/todoController.js");

const {
  saveSession,
  getSession
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

// login token based
app.post("/api/session", function (req, res, next) {
  if (req.body.username && req.body.password &&
    req.body.username === 'admin' && req.body.password === 'password') {

    const session = saveSession(req.body.username);
    session.then(function(session){
      console.log('session', session);
      if (!session) {
        res.status(422);
        res.json({
          error: 'There was an error saving the session'
        });
      }
      res.status(201).json({
        session
      });
    })
  } else {
    res.status(422);
    res.json({
      error: 'Invalid username or password'
    });
  }
});

// Token based Auth
app.use(function (req, res, next) {
  if (req.headers["authorization"]) {
    const token = req.headers['authorization'].split(' ')[1];
    try {
      //validate if token exists in the database
      const session = getSession(token);
      session.then(function (session) {
        if (session) {
          next();
          return;
        } else {
          res.status(401);
          res.send({
            error: "Unauthorized "
          });
        }
      })
      .catch(function(err){
        console.log('there was an error getting the session', err);
        res.status(422);
        res.send({
          error: "There was an error: " + e.message
        });
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