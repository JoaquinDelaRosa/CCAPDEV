var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const app = require('../app');
const Post = require('../database/models/post');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const post = await Post.find({id : req.query.id}) 
  res.send(post);
});

/* POST users listing */ 
router.post('/', function(req, res, next) {
  // TODO: Replace with Mongoose
  posts.push(req.body);
  res.send("Successfully added post")
  Post.create(
    req.body,
    (error, user) => {
      res.redirect('/')
    }
  )
})

/* PATCH users listing */
router.patch('/', function(req, res, next) {
  // TODO: Replace with Mongoose
  // This is incomplete
  
  res.send("Successfully editted post")
})

/* DELETE users listing */
router.delete('/', function(req, res, next) {
  // TODO: Replace with Mongoose
  posts = posts.filter((value) => {req.query.username !== value.id});
  res.send("Successfully deleted post")
})

module.exports = router;
