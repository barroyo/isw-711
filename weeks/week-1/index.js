const express = require('express');
const app = express();


// listen to GET requests on /hello
app.get('/hello', function (req, res) {
  res.send('World');
});


app.listen(3000, () => console.log(`Example app listening on port 3000!`))
