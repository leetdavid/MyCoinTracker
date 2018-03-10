var express = require('express');
var router = express.Router();

let request = require('request');
let axios = require('axios');

/* GET home page. */
router.get('/', (req, res, next) => {

  let url = 'https://api.coinmarketcap.com/v1/ticker/';
  axios
    .get(url)
    .then(response => {
      console.log(response.data);
      res.render('index', { title: 'Express' , ticker: response.data});
    })
    .catch(err => {
      console.log(err);
      res.render('error');
    });
    
  
});

module.exports = router;
