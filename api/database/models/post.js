const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    id : Number,
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
    comments: Array
})

const Post = mongoose.model('Posts', PostSchema);

module.exports = Post;