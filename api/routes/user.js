var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const app = require('../app');

let profiles = [{
  "id": 1,
  "pfp": "None",  // Handle images
  "name": "Andrei",
  "username": "AChua123",
  "password": "12345",
  "about": "A person lurking in this website (not a bot)",
  "gender": "Male",
  "saves": [],
  "posts": [],
  "dateJoined": "March 20, 2022"
}]

// TOOO: Replacre with Mongoose query
function getProfile(queryUsername){
  let ret = {}
  console.log(queryUsername);
  profiles.forEach((value) => {
    if (value.username === queryUsername){
      ret = value;
    }
  })

  return ret;
}


/* GET users listing. */
router.get('/', function(req, res, next) {
  const profile = getProfile(req.query.username);
  res.send(profile);
});

/* POST users listing */ 
router.post('/register', function(req, res, next) {
  // TODO: Replace with Mongoose
  profiles.push(req.body);
  console.log("Success");
  res.send({message : "Successfully added to profile" })
})

/* PATCH users listing */
router.patch('/', function(req, res, next) {
  // TODO: Replace with Mongoose
  // This is incomplete
  
  res.send("Successfully editted profile")
})

/* DELETE users listing */
router.delete('/', function(req, res, next) {
  // TODO: Replace with Mongoose
  profiles = profiles.filter((value) => {req.query.username !== value.id});
  res.send("Successfully deleted profile")
})

module.exports = router;
