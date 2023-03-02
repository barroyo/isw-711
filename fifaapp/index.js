const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/fifapp", { useNewUrlParser: true, useUnifiedTopology: true });
const {saveSession, getSession } = require('./controllers/sessionController');
const {
  base64decode
} = require('nodejs-base64');


const Team = require("./models/team");
const Player = require("./models/player");

const bodyParser = require("body-parser");
// Middlewares
app.use(cors());
app.use(bodyParser.json());

// HTTP Basic Auth
// app.use(function (req, res, next) {
//   if (req.headers["authorization"]) {
//     console.log(req.headers["authorization"]);
//     const authBase64 = req.headers['authorization'].split(' ');
//     console.log('authBase64:', authBase64);
//     const userPass = base64decode(authBase64[1]);
//     console.log('userPass:', userPass);
//     const user = userPass.split(':')[0];
//     const password = userPass.split(':')[1];

//     if (user === 'admin' && password == '1234') {
//       // saveSession('admin');
//       next();
//       return;
//     }
//   }
//   res.status(401);
//   res.send({
//     error: "Unauthorized"
//   });
// });

// login token based
app.post("/session", function (req, res, next) {
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

// REST Routes
app.post('/player', async function (req, res) {
  const player = new Player.model();
  player.first_name = req.body.first_name;
  player.last_name = req.body.last_name;
  player.age = req.body.age;

  //find the team
  try {
    const teamFound = await Team.model.findById(req.body.team);
    if (teamFound) {
      player.team = teamFound;
    }

    // create the player anyway
    if (player.first_name && player.last_name) {
      await player.save();
      res.status(201);//CREATED
      res.header({
        'location': `http://localhost:3000/player/?id=${player.id}`
      });
      res.json(player);
    } else {
      res.status(422);
      console.log('error while saving the player')
      res.json({
        error: 'No valid data provided for player'
      });
    }

  } catch (error) {
    res.status(422);
    console.log('error while saving the player', error)
    res.json({
      error: 'There was an error creating the player'
    });
  }
});

app.get('/player', async function (req, res) {

  //find the team
  try {
    const players = await Player.model.find();
    if (players) {
      res.json({data: players})
    } else {
      res.status(204).json({});
    }
  } catch (error) {
    res.status(422);
    console.log('error while getting the players', error)
    res.json({
      error: 'There was an error getting the players'
    });
  }
});

app.post('/team', function (req, res) {

  const team = new Team.model();


  team.name = req.body.name;
  team.description = req.body.description;;
  if (team.name && team.description) {
    team.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the team', err);
        res.json({
          error: 'There was an error saving the team'
        });
      }
      res.status(201);//CREATED
      res.header({
        'location': `http://localhost:3000/team/?id=${team.id}`
      });
      res.json(team);
    });
  } else {
    res.status(422);
    console.log('error while saving the team')
    res.json({
      error: 'No valid data provided for team'
    });
  }
});

// app.patch('/tasks', (req, res) => {

//   // check if there's an ID in the querystring
//   if (req.query && req.query.id) {
//     Task.findById(req.query.id, function (err, task) {
//       if (err) {
//         res.status(404);
//         console.log('error while queryting the task', err);
//         res.json({ error: "Task doesnt exist" });
//       }

//       // update the task object (patch)
//       task.title = req.body.title ? req.body.title : task.title;
//       task.detail = req.body.detail ? req.body.detail : task.detail;
//       // update the task object (put)
//       // task.title = req.body.title
//       // task.detail = req.body.detail

//       task.save(function (err) {
//         if (err) {
//           res.status(422);
//           console.log('error while saving the task', err);
//           res.json({
//             error: 'There was an error saving the task'
//           });
//         }
//         res.status(200); // OK
//         res.json(task);
//       });
//     });
//   } else {
//     res.status(404);
//     res.json({ error: "Task doesnt exist" });
//   }

// });

app.listen(4000, () => console.log(`Fifa app listening on port 3000!`))

