var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const app = require('../app');
const Post = require('../database/models/post');

const uuid = require('node-uuid');


// Hyper Parameters
const LIMIT = 100;


/* GET post listing. */
// Query params: id
router.get('/', async function(req, res, next) {
    const post = await Post.find({ 'id': req.query.id }).sort({ 'date': 'desc' })
    res.json(post);
});

function parseQuery(q){
  const tokens = q.split(' ')
  const queryObject = {
    authors : [],
    tags: [],
    contents: ""
  }

  tokens.forEach( (value) => {
    if(value.startsWith("author:")){
      queryObject.authors.push(value.replace('author:', ''));
    } else if(value.startsWith("tag:")){
      queryObject.authors.push(value.replace('tag:', ''));
    } else {
      queryObject.contents += (value + " ");
    }
  })

  queryObject.contents = queryObject.contents.trim();

  return queryObject;
}

router.get('/search', async function(req, res, next) {
  const body = parseQuery(req.query.q);
  let findQuery = {

  };

  if (body.authors.length !== 0){
    findQuery["author"] = {$all : body.authors};
  }
  if (body.contents !== ""){
    findQuery["title"] = body.contents;
  }
  if (body.tags.length !== 0){
    findQuery["tags"] = {$all : body.tags};
  }

  const content = await Post.find(
    findQuery
  )
    .sort({ 'date': 'desc' })
    .limit(LIMIT);
  
  res.json(content);
})

// For feed
// Query params: limit 

// Sort by: Date posted
// Limit: 100;
router.get('/feed', async function(req, res, next) {
    const content = await Post.find({})
        .sort({ 'date': 'desc' })
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
router.patch('/edit', function(req, res, next) {
    Post.updateOne({ 'id': req.query.id }, req.body, (err) => {
        if (err){
            console.log(err);
            res.send({message: "Failed to edit post"});
            res.end();
        } else {
            res.send({message: "Successfully editted post"})
            res.end();
        }
    });
})

/* DELETE post listing */
// Query params: id
router.delete('/', function(req, res, next) {
    Post.deleteOne({ 'id': req.query.id })
    .then((delRes) => {
        if(delRes.deletedCount <= 0)
          res.send({message: "No Post Matched in Database"})
        else if(delRes.deletedCount === 1)
          res.send({message: "Post Successfully Deleted"})
        res.end();
    })
    .catch((err) => {
      console.log(err);
      console.log("Query Error! Failed to Execute Delete.")
    });;
})

/* PATCH edit post listing */
// Query params: id
router.patch('/editPost', function(req, res, next) {
  Post.updateOne({ 'id': req.query.id }, req.body, (err) => {
      if (err){
          console.log(err);
          res.send({message: "Failed to update post"});
          res.end();
      } else {
          res.send({message: "Successfully update post"})
          res.end();
      }
  });
})

module.exports = router;