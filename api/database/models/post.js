const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
    id : {
        type: String,
    },
    title : {
        type: String,
    },
    author : {
        type: String,
    },
    date : {
        type: String,
    },
    mediaPath : {
        type: String,
    },
    mediaAlt: String,
    body : {
        type: String,
    },
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