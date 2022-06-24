const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    pfp : String,
    id : {
        type: String,
    },
    email: {
        type: String,
    },
    username : {
        type: String,
    },
    password : {
        type: String,
    },
    about: String,
    gender: String,
    saves: Array,
    posts: Array,
    dateJoined: {
        type: String,
    }
})

const User = mongoose.model('Users', UsersSchema);

module.exports = User;