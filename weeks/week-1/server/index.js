const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
//middlewares
app.use(bodyParser.json());
app.use(cors({
  domains: '*',
  methods: "*"
}));

//routes
app.get('/tipocambio', function (req, res) {
  res.json({
    "TipoCompraDolares" : "621",
    "TipoVentaDolares" : "621",
    "TipoCompraEuros" : "731.85",
    "TipoVentaEuros" : "761.9"
  });
});
//start the app
app.listen(3001, () => console.log(`BBCR Exchange type service listening on port 3001!`))
