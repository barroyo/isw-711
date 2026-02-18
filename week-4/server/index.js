const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Course = require('./models/course');


mongoose.connect('mongodb://127.0.0.1:27017/utnapi');
const database = mongoose.connection;


database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
});


const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cors({
  domains: '*',
  methods: ['GET'],
}));


//routes
app.use('/api', require('./routes/courses'));
app.use('/api', require('./routes/teachers'));


//start the app
app.listen(3001, () => console.log(`UTN API service listening on port 3001!`))
