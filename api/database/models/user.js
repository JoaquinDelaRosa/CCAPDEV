const mongoose = require("mongoose"), 
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
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

UserSchema.pre("save", function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
})

UserSchema.methods.comparePassword = function(other, callback) {
    bcrypt.compare(other, this.password, function(err, success) {
        if (err) return cb(err);
        callback(null, success);
    });
};

const User = mongoose.model('Users', UserSchema);

module.exports = User;