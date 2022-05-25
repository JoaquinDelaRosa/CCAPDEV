const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/testDB',
{useNewURLParser: true, useUnifiedTopology: true})

const fileUpload = require('express-fileupload')


var express = require('express');
var router = express.Router();
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
