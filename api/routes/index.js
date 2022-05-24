const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/testDB')

var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
