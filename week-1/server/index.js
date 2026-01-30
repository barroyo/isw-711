const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

//middlewares
app.use(express.json());
app.use(cors({
  domains: '*',
  methods: '*'
}));

//routes
app.get('/tipocambio', function (req, res) {
  let response = {};
  switch(req.query.type) {
    case 'usd':
      response = {
        "TipoCompraDolares" : "498",
        "TipoVentaDolares" : "500"
      }
    break;
    case 'eur':
      response = {
        "TipoCompraEuros" : "576.85",
        "TipoVentaEuros" : "598.9"
      }
    break;
    default:
      response = {
        "TipoCompraDolares" : "621",
        "TipoVentaDolares" : "621",
        "TipoCompraEuros" : "576.85",
        "TipoVentaEuros" : "598.9"
      }
    break;
  }
  res.status(200).json(response);
});

app.get('/tipocambio-usd', function (req, res) {
  let response = {};
  response = {
    "TipoCompraDolares" : "498",
    "TipoVentaDolares" : "500"
  }
  res.status(200).json(response);
});

app.get('/tipocambio-eur', function (req, res) {
  let response = {};
  response = {
    "TipoCompraEuros" : "576.85",
    "TipoVentaEuros" : "598.9"
  }
  res.json(response);
});

//start the app
app.listen(3001, () => console.log(`BBCR Exchange type service listening on port 3001!`))
