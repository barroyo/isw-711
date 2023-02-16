const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/fifapp");
const Team = require("./models/team");
const Player = require("./models/player");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

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

app.listen(3000, () => console.log(`Fifa app listening on port 3000!`))

