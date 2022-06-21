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

router.post('/login', async function(req, res, next) {
  // Send only the first match
  console.log("in backend login");
  const profile = await User.find({
      $and: [
        {'username': req.body.username},
        {'password': req.body.password}
      ]
    });
  res.json(profile[0]);
  res.end();
});

/* POST users listing */ 
router.post('/register', function(req, res, next) {  
  User.create(
    req.body,
    (error, user) => {
      if (error) {
        console.log(error);
        res.send({message: "Failed to add to database"});
        res.end();
      }
      else {
        res.send({message : "Successfully added to database" });
        res.end();
      }
    }
  )
})

/* PATCH users listing */
router.patch('/update', function(req, res, next) {
  User.updateOne({'username' : req.query.username}, req.body, (err) => {
    if(err) {
      console.log(err);
      res.send({message: "Failed to edit profile"});
      res.end();
    }
    else {
      res.send({message: "Successfully editted profile"})
      res.end();
    }
  })
})

router.patch('/upload', function(req, res, next) {
  User.findOneAndUpdate({'username' : req.query.username}, {
    '$push' : {posts : req.body.id}
  }, (err) => {
    if(err) {
      console.log(err);
      res.send({message: "Failed to edit profile"});
      res.end();
    }
    else {
      res.send({message: "Successfully editted profile"})
      res.end();
    }
  })
})

/* DELETE users listing */
router.delete('/delete', function(req, res, next) {
  User.deleteOne({'username' : req.query.username})
    .then((delRes) => {
        if(delRes.deletedCount <= 0)
          res.send({message: "No Account Matched in Database"})
        else if(delRes.deletedCount === 1)
          res.send({message: "Account Successfully Deleted"})
        res.end();
    })
    .catch((err) => {
      console.log(err);
      console.log("Query Error! Failed to Execute Delete.")
    });
})


module.exports = router;
