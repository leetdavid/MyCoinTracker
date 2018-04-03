var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    console.log('USER: ' + req.user);
    res.render('portfolio', {title: 'Portfolio', user: req.user})
});

module.exports = router;