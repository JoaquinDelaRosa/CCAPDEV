var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const app = require('../app');
const Post = require('../database/models/post');

// Hyper Parameters
const LIMIT = 100;


/* GET post listing. */
// Query params: id
router.get('/', async function(req, res, next) {
    const post = await Post.find({ 'id': req.query.id }).sort({ 'date': 'desc' })
    res.json(post);
});

// Body params: tags, name, 
router.get('/search', async function(req, res, next) {
    const post = await Post
        .find({
            'title' : {$regex : '.*' + req.body.name + '.*'} ,
            'tags' : {$all : req.body.tags}
        })
        .sort({ 'date': 'desc' })
        .limit(LIMIT)
    res.send(post);
})

// For feed
// Query params: limit 

// Sort by: Date posted
// Limit: 100;
router.get('/feed', async function(req, res, next) {
    const content = await Post.find({})
        .sort({ 'datePosted': 'desc' })
        .limit(LIMIT);
    res.json(content);
});

/* POST post listing */
router.post('/upload', function(req, res, next) {
    console.log(req.body)
    Post.create(
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

/* PATCH post listing */
// Query params: id
router.patch('/', function(req, res, next) {
    Post.updateOne({ 'id': req.query.id }, req.body);
    res.send("Successfully editted post")
})

/* DELETE post listing */
// Query params: id
router.delete('/', function(req, res, next) {
    Post.deleteOne({ 'id': req.query.id });
    res.send("Successfully deleted post")
})

module.exports = router;