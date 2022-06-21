const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
    id : {
        type: String,
        required: true
    },
    title : {
        type: String,
        required: true
    },
    author : {
        type: String,
        required: true
    },
    date : {
        type: String,
        required: true
    },
    mediaPath : {
        type: String,
        required: true
    },
    mediaAlt: String,
    body : {
        type: String,
        required: true
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