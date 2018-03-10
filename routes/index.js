var express = require('express');
var router = express.Router();

let request = require('request');
let axios = require('axios');

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function shortify(value, decimals){
  if(value/1000 < 1000){
    return round(value/1000, decimals) + 'K';
  }
  if(value/1000000 < 1000){
    return round(value/1000000, decimals) + 'M';
  }
  if(value/1000000000 < 1000){
    return round(value/1000000000, decimals) + 'B';
  }
  if(value/1000000000000 < 1000){
    return round(value/1000000000000, decimals) + 'T';
  }
}

/* GET home page. */
router.get('/', (req, res, next) => {

  let url = 'https://api.coinmarketcap.com/v1/ticker/';
  axios
    .get(url)
    .then(response => {

      let ticker = response.data;
      
      // Object.entries(ticker).foreach((coin) => {
      //   coin.market_cap_usd = shortify(coin.market_cap_usd);
      // });

      for(let i in ticker){
        let coin = ticker[i];
        coin.market_cap_usd = shortify(coin.market_cap_usd, 2);
        coin['24h_volume_usd'] = shortify(coin['24h_volume_usd'], 2);
      }

      res.render('index', { title: 'Cryptocurrency Market Capitalizations | My Coin Tracker' , ticker: ticker});
    })
    .catch(err => {
      console.log(err);
      res.render('error');
    });
});



module.exports = router;
