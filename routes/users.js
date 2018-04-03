let express = require('express');
let router = express.Router();

let passport = require('passport');
let mongoose = require('mongoose');
let User = require('../models/User');

router.post('/register', (req, res, next) => {
  User.register(
    new User({username: req.body.email, password: req.body.password}),
    req.body.password,
    (err, user) => {
      if(err) {
        console.error(err);
        return res.render('login', {title: 'Login | My Coin Tracker', user: req.user});
      }

      passport.authenticate('local')(req, res, () => {
        res.redirect('/portfolio');
      });
    }
  )
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local')(req, res, function() {
    res.redirect('/');
  });
0});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});


module.exports = router;
