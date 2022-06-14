const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
    id : String,
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
});
PostSchema.index({title: 'text'})

const Post = mongoose.model('Posts', PostSchema);

module.exports = Post;