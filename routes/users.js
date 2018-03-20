var express = require('express');
var router = express.Router();

let User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.post('/login', (req, res, next) => {
  if(req.body.logemail && req.body.logpassword){
    User.authenticate(req.body.logemail, req.body.logpassword, (error, user) => {
      if(error || !user){
        let err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } 
      else {
        let err = new Error('All fields are required.');
        err.status = 400;
        return next(err);
      }
    });
  }
});

router.post('/register', (req, res, next) => {

  if(req.body.password !== req.body.passwordConf){
    let error = new Error('Passwords do not match.');
    error.status = 400;
    res.send('passwords do not match');
    return next(error);
  }

  if(req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf){
    
    let userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf
    }

    User.create(userData, (err, user) => {
      if(err) return next(err);
      else {
        res.redirect('/portfolio');
      }
    });
  }
});

module.exports = router;
