const express = require('express');
const app = express();
const https = require('https');
const axios = require('axios');
const APIURL = 'https://api.openbrewerydb.org';
const DEFAULT_PAGE_SIZE = 10;
const cors = require("cors");

// check for cors
app.use(cors({
  domains: '*',
  methods: "PUT, PATH"
}));

// listen to GET requests on /cerveceria
app.get('/cerveceria', function (req, res) {

  let page = req.query && req.query.page ? req.query.page : DEFAULT_PAGE_SIZE;
  let id = req.query && req.query.id ? req.query.id : undefined;
  let response = '';

  if (id) {
    getOne(id, res);
  } else {
    getAllPaginated(page, res);
    // response = getAxios(page);
  }
  // res.send(response);
});

function getAxios(page) {
  let x = axios.get(APIURL + '/breweries?per_page=' + page)
    .then(response => {
      return response.data;
      // console.log(response.data.url);
      // console.log(response.data.explanation);
    })
    .catch(error => {
      console.log(error);
      return error;
    });
  return x;
}

/**
 * Get all the breweries in pages
 * @param {*} page Specific page size
 */
function getAllPaginated(page, res) {
  https.get(APIURL + '/breweries?per_page=' + page, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      res.send(data);
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
};

/**
 * Get one specific brewery
 *
 * @param {*} id
 */
function getOne(id, res) {
  return https.get(APIURL + '/breweries/' + id, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      res.send(data);
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

app.listen(3000, () => console.log(`Example app listening on port 3000!`))
