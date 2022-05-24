var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const app = require('../app');
const posts = [{
  "id" : 1,
  "title" : "Introducing The turboencabulator",
  "author" : "Anonymous",
  "date": new Date(2022, 0, 1),
  "mediaPath" : "../images/sample.png",
  "mediaAlt" : "",
  "body" : 
  " The original machine has a base-plate of prefabulated amulite, surmounted by a malleable logarithmic.",
  "upvotes": 10,
  "downvotes": 20,
  "views": 100,
  "tags" : ["Random", "Funny", "Science", "Technobabble", "Tag", "Game", "Meme", "Gibberish", "English", "This is a tag", "Read", "Test"],
  "comments" : [{
      "id": 2,
      "author"    : "Jane Doe",
      "date"      : new Date(2022, 0, 2),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" : "This is cool and all but why is my username Jane Doe?",
      "upvotes"  : 15,
      "downvotes" : 12,
      "views"     : 20,
      "comments" : []
    },
  
    {
    "id": 3,
    "title" : "Machines are cool",
    "author" : "Jane Doe",
    "date"  : new Date(2022, 0, 3),
    "mediaPath" : null,
    "mediaAlt" : "",
    "body" :   "This is the first comment of post 1. Hi yeah machines are cool indeed hehe.",
    "upvotes"  : 1,
    "downvotes" : 10,
    "views"     : "12",
    "comments" : [{
        "id": 4,
        "author"    : "Jane Doe",
        "date"  : new Date(2022, 0, 4),
        "mediaPath" : null,
        "mediaAlt" : "",
        "body" : "Wow! Great!",
        "upvotes"  : 15,
        "downvotes" : 12,
        "views"     : 20,
        "comments" : []
      }]
    }
  ]},
  {
      "id": 5,
      "title" : "Help! Username Problem",
      "author" : "Jane2 Doe",
      "date"  : new Date(2022, 0, 5),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" :   "Post 2. What the heck! Why is my name Jane 'Two'??? I thought I was the real Jane! This is absolutely uncalled for.",
      "upvotes"  : 1,
      "downvotes" : 10,
      "views"     : "12",
      "comments" : [{
          "id": 6,
          "author"    : "Jane3 Doe",
          "date"  : new Date(2022, 0, 6),
          "mediaPath" : null,
          "mediaAlt" : "",
          "body" : "Wait there is a Jane1 and Jane2??",
          "upvotes"  : 15,
          "downvotes" : 12,
          "views"     : 20,
          "comments" : []
        }]
  },
  {
      "id": 7,
      "title" : "Have you seen Jane5???",
      "author" : "Jane4 Doe",
      "date"  : new Date(2022, 0, 7),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" :   "Post 3. Day 5 of being Jane4. I still can't find Jane5. He seems to be missing. I don't know what to do anymore. I'm running out of food.",
      "upvotes"  : 1,
      "downvotes" : 10,
      "views"     : "12",
      "comments" : [{
          "id": 8,
          "author"    : "Jane Doe5",
          "date"  : new Date(2022, 0, 8),
          "mediaPath" : null,
          "mediaAlt" : "",
          "body" : "I'm not sure if I'm the one you're looking for. I'm not Jane5, I'm Doe5 though.",
          "upvotes"  : 15,
          "downvotes" : 12,
          "views"     : 20,
          "comments" : []
        }]
  },
  {
      "id": 9,
      "title" : "I'm sick of this",
      "author" : "John Doe",
      "date"  : new Date(2022, 0, 9),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" :   "Post 4. I'm sick and tired of all these Jane Doe posts. WE DON'T CARE YOU'RE JANE DOE. This forum has come to garbage. It used to be so diverse.",
      "upvotes"  : 10000,
      "downvotes" : 420,
      "views"     : "12",
      "comments" : [{
          "id": 10,
          "author"    : "John1 Doe",
          "date"  : new Date(2022, 0, 10),
          "mediaPath" : null,
          "mediaAlt" : "",
          "body" : "I agree. I mean wheres all the John Doe love??",
          "upvotes"  : 5258,
          "downvotes" : 420,
          "views"     : 20,
          "comments" : []
        },
        {
          "id": 11,
          "author"    : "John10000 Doe",
          "date"  : new Date(2022, 0, 11),
          "mediaPath" : null,
          "mediaAlt" : "",
          "body" : "I got the 10000 upvote! Wait... did all the John's just upvote this post?",
          "upvotes"  : 10000,
          "downvotes" : 360,
          "views"     : 20,
          "comments" : []
        }]
  },
  {
      "id": 12,
      "title" : "How to delete account?",
      "author" : "Jane69 Doe",
      "date"  : new Date(2022, 0, 12),
      "mediaPath" : null,
      "mediaAlt" : "",
      "body" :   "Post 5. How I can delete my account ? Hi, I no longer want to have this account anymore, so I want to delete it. But I don't find any button for this. Please, could you help me with this?",
      "upvotes"  : 10,
      "downvotes" : 0,
      "views"     : "12",
      "comments" : [{
          "id": 13,
          "author"    : "John420 Doe",
          "date"  : new Date(2022, 0, 13),
          "mediaPath" : null,
          "mediaAlt" : "",
          "body" : "Yeah. It's in your profile settings. Theres a big red button called Danger Zone.",
          "upvotes"  : 3,
          "downvotes" : 5,
          "views"     : 20,
          "comments" : []
        }]
  }
]

// TOOO: Replacre with Mongoose query
function getPost(queryId){
  let ret = {};
  posts.forEach((value) => {
    if (value.id.toString() === queryId){
      ret = value;
    }
  })

  return ret;
}


/* GET users listing. */
router.get('/', function(req, res, next) {
  const post = getPost(req.query.id);
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
