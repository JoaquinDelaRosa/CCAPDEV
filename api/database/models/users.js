const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    pfp : String,
    id : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    about: String,
    gender: String,
    saves: Array,
    posts: Array,
    dateJoined: {
        type: String,
        required: true
    }
})

const User = mongoose.model('Users', UsersSchema);

module.exports = User;