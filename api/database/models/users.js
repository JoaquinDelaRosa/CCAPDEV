const mongoose = require("mongoose"), 
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

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

UsersSchema.pre("save", function(next) {
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

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model('Users', UsersSchema);

module.exports = User;