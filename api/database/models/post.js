const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    id : Number,
    title : String,
    author : String,
    date : Date,
    mediaPath : String,
    mediaAlt: String,
    body : String,
    upvotes : Array,
    downvotes : Array,
    favorites :  Array,
    views : Array,
    tags : [String],
    comments: Array
})

const Post = mongoose.model('Posts', PostSchema);

module.exports = Post;