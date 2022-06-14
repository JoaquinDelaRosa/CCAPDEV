const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    pfp : String,
    email: String,
    username : String,
    password : String,
    about: String,
    gender: String,
    dateJoined: Date
})

const User = mongoose.model('Users', UsersSchema);

module.exports = User;