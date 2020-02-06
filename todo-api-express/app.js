const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const db = mongoose.connect("mongodb://127.0.0.1:27017/todo-api");
const app = express();

const Task = require("../todo-api-express/models/taskModel");
const basicAuth = require('express-basic-auth')
const {
  base64decode
} = require('nodejs-base64');

// TODO: this should be an ENV var
const theSecretKey = '123';
const {
  postMethod,
  getMethod
} = require("./controllers/todoController.js");
const cors = require("cors");

const bodyParser = require("body-parser");

// check for cors
app.use(cors());

// parses the body
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// do not validate on authentication api
app.post("/api/session", function (req, res, next) {
  if (req.body.username && req.body.password &&
    req.body.username === 'admin' && req.body.password === 'password') {
    const token = jwt.sign({
      userId: 123,
      name: 'Bladimir',
      permission: ['create', 'edit', 'delete']
    }, theSecretKey);

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

// custom basic authentication
// app.use(function (req, res, next) {
//   if (req.headers["authorization"]) {
//     const authBase64 = req.headers['authorization'].split(' ');
//     const userPass = base64decode(authBase64[1]);
//     const user = userPass.split(':')[0];
//     const password = userPass.split(':')[1];

//     //
//     if (user === 'admin' && password == '1234') {
//       next();
//       return;
//     }
//   }
//   res.status(401);
//   res.send({
//     error: "Unauthorized "
//   });
// });

// using basic auth
// app.use(basicAuth({
//   users: {
//     'admin': '1234',
//     'user1': 'supersecret1',
//     'user2': 'supersecret2',
//   }
// }));

// handle the routes
app.get("/api/tasks", getMethod);
app.post("/api/tasks", postMethod);

// handle 404
app.use(function (req, res, next) {
  res.status(404);
  res.send({
    error: "Not found"
  });
  return;
});

app.listen(3000, () => console.log("TODO API is listening on port 3000!"));