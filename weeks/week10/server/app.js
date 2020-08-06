const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const db = mongoose.connect("mongodb://127.0.0.1:27017/todo-api");
const app = express();
const cors = require("cors");

// TODO: this should be an ENV var
const THE_SECRET_KEY = '123';

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
    //TODO: validate user in the database
    const payload = {
      userId: 123,
      name: 'Bladimir',
      username: req.body.username,
      permission: ['create', 'edit', 'delete'],
      ip: req.ips,
      agent: req.get('user-agent')
    };

    const token = jwt.sign(payload, THE_SECRET_KEY, {
      expiresIn: 1440
    });

    res.status(201).json({
      token
    })
  } else {
    next();
  }
});

// JWT Validation
app.use(function (req, res, next) {
  if (req.headers["authorization"]) {
    const authToken = req.headers['authorization'].split(' ')[1];
    try {
      jwt.verify(authToken, THE_SECRET_KEY, (err, decodedToken) => {
        if (err || !decodedToken) {
          res.status(401);
          res.json({
            error: "Unauthorized "
          });
        }

        // here I can validate if the token was created from a different user agent or from a different IP
        console.log('Payload:', decodedToken);
        next();
      });
    } catch (e) {
      res.status(401);
      res.send({
        error: "Unauthorized "
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