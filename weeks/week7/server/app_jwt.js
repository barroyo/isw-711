const express = require("express");
const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
const db = mongoose.connect("mongodb://127.0.0.1:27017/todo-api");
const app = express();
const crypto = require('crypto');
import jwt from "jsonwebtoken";


const Task = require("../todo-api-express/models/taskModel");
const Session = require("../todo-api-express/models/sessionsModel");


export function verifyJWTToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err);
      }

      resolve(decodedToken);
    });
  });
}


export function createJWToken(details) {
  if (typeof details !== 'object') {
    details = {}
  }

  if (!details.maxAge || typeof details.maxAge !== 'number') {
    details.maxAge = 3600
  }

  let token = jwt.sign({
    data: details.sessionData
  }, process.env.JWT_SECRET, {
    expiresIn: details.maxAge,
    algorithm: 'HS256'
  })

  return token
}

const cors = require("cors");

// TODO: this should be an ENV var
const theSecretKey = '123';

const bodyParser = require("body-parser");

const {
  postMethod,
  getMethod,
  patchMethod,
} = require("./controllers/todoController.js");
// check for cors
app.use(cors());

// parses the body
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());


app.post("/api/session", function (req, res, next) {
  if (req.body.username && req.body.password &&
    req.body.username === 'admin' && req.body.password === 'password') {
    let token = crypto.createHash('md5').update(req.body.username + req.body.password).digest("hex")
    // const token = jwt.sign({
    //   userId: 123,
    //   name: 'Bladimir',
    //   permission: ['create', 'edit', 'delete']
    // }, theSecretKey);

    res.status(201).json({
      token
    })
  } else {
    next();
  }
});

// JWT Authentication
app.use(function (req, res, next) {
  if (req.headers["authorization"]) {
    const authToken = req.headers['authorization'].split(' ')[1];
    try {
      jwt.verify(authToken, theSecretKey, (err, decodedToken) => {
        if (err || !decodedToken) {
          res.status(401);
          res.json({
            error: "Unauthorized "
          });
        }
        console.log('Welcome', decodedToken.name);
        next();
        // if (decodedToken.userId == 123) {
        //   next();
        // }
      });
    } catch (e) {
      next();
    }

  } else {
    res.status(401);
    res.send({
      error: "Unauthorized "
    });
  }
});

// Token based Auth

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