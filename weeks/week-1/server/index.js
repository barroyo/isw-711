const express = require('express');
const app = express();
const cors = require("cors");

// check for cors
app.use(cors({
  domains: '*',
  methods: "*"
}));


// listen to GET requests on /hello
app.get('/hello', function (req, res) {
  res.send('Hello World');
});


app.listen(3000, () => console.log(`Example app listening on port 3000!`))
