const express = require("express");
const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
const db = mongoose.connect("mongodb://127.0.0.1:27017/todo-api");
const app = express();
const crypto = require('crypto');


const Task = require("../todo-api-express/models/taskModel");
const Session = require("../todo-api-express/models/sessionsModel");
// const basicAuth = require('express-basic-auth')
// const {
//   base64decode
// } = require('nodejs-base64');
const cors = require("cors");

// TODO: this should be an ENV var
// const theSecretKey = '123';

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

// login
app.post("/api/session", function (req, res, next) {
  if (req.body.username && req.body.password &&
    req.body.username === 'admin' && req.body.password === 'password') {
    let token = crypto.createHash('md5').update(req.body.username + req.body.password).digest("hex")
    // insert token to the session table
    const session = new Session();
    session.token = token;
    session.user = 'admin';
    session.expire = new Date();
    session.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the session', err)
        res.json({
          error: 'There was an error saving the session'
        });
      }
      res.status(201).json({
        session
      })
    });
  } else {
    next();
  }
});

// app.post("/api/session", function (req, res, next) {
//   if (req.body.username && req.body.password &&
//     req.body.username === 'admin' && req.body.password === 'password') {
//     let token = crypto.createHash('md5').update(req.body.username + req.body.password).digest("hex")
//     // const token = jwt.sign({
//     //   userId: 123,
//     //   name: 'Bladimir',
//     //   permission: ['create', 'edit', 'delete']
//     // }, theSecretKey);

//     res.status(201).json({
//       token
//     })
//   } else {
//     next();
//   }
// });

// JWT Authentication
// app.use(function (req, res, next) {
//   if (req.headers["authorization"]) {
//     const authToken = req.headers['authorization'].split(' ')[1];
//     try {
//       jwt.verify(authToken, theSecretKey, (err, decodedToken) => {
//         if (err || !decodedToken) {
//           res.status(401);
//           res.json({
//             error: "Unauthorized "
//           });
//         }
//         console.log('Welcome', decodedToken.name);
//         next();
//         // if (decodedToken.userId == 123) {
//         //   next();
//         // }
//       });
//     } catch (e) {
//       next();
//     }

//   } else {
//     res.status(401);
//     res.send({
//       error: "Unauthorized "
//     });
//   }
// });

// Token based Auth
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

// custom basic authentication
// app.use(function (req, res, next) {
//   if (req.headers["authorization"]) {
//     const authBase64 = req.headers['authorization'].split(' ');
//     console.log('auth code:', authBase64);
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