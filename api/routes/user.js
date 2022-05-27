var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const app = require('../app');
const User = require('../database/models/users');


/* GET users listing. */
router.get('/', async function(req, res, next) {
  // Send only the first match
  const profile = await User.find(({'username' : req.query.username}));
  res.send(profile[0]);
});

/* POST users listing */ 
router.post('/register', function(req, res, next) {
  console.log(req.body);
  
  User.create(
    req.body,
    (error, user) => {
      if (error)
        console.log(error);
    }
  )
  res.send({message : "Successfully added to database" })
  res.end();
})

/* PATCH users listing */
router.patch('/', function(req, res, next) {
  User.updateOne({'username' : req.query.username}, req.body);
  res.send("Successfully editted profile")
})

/* DELETE users listing */
router.delete('/', function(req, res, next) {
  User.deleteOne({'username' : req.query.username});
  res.send("Successfully deleted profile")
})


module.exports = router;
