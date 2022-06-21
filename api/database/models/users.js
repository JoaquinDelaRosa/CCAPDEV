const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    pfp : String,
    email: String,
    username : String,
    password : String,
    about: String,
    gender: String,
    saves: Array,
    posts: Array,
    dateJoined: Date
})

const User = mongoose.model('Users', UsersSchema);

module.exports = User;