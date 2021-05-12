const express = require('express');
const cors = require("cors");
const app = express();


// check for cors
app.use(cors({
  domains: '*',
  methods: "*"
}));


// listen to GET requests on /hello
app.get('/hello', function (req, res) {
  res.send('Hello World');
});


app.get('/tipocambio', function (req, res) {
  res.send(`{
    "TipoCompraDolares" : "608",
    "TipoVentaDolares" : "621",
    "TipoCompraEuros" : "731.85",
    "TipoVentaEuros" : "761.9"
  }`);
});


app.listen(3000, () => console.log(`Example app listening on port 3000!`))
