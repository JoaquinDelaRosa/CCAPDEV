const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title : String,
    author : String,
    date : Date,
    mediaPath : String,
    mediaAlt: String,
    body : String,
    upvotes : Number,
    downvotes : Number,
    views : Number,
    tags : Array,
    comments: Document
})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;