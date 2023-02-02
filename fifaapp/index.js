const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://127.0.0.1:27017/fifapp");
const TeamModel = require("./models/team");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// app.get('/tipocambio',  (req, res) => {
//   // generate a response
//   res.json({
//     "TipoCompraDolares" : "608",
//     "TipoVentaDolares" : "621",
//     "TipoCompraEuros" : "731.85",
//     "TipoVentaEuros" : "761.9"
//   });
// });


app.post('/team', function (req, res) {

  const team = new TeamModel();


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

