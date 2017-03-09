var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

var validate = require('../middleware/validators');

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        validate: [validate.username, validate.usernameError]
    },
    formattedUsername: {
        type: String,
        unique: true,
        required: true,
        validate: [validate.username, validate.usernameError]
    },
    email: {
        type: String,
        unique: false,
        required: true,
        lowercase: true,
        maxlength: 35,
        validate: [validate.email, validate.emailError]
    },
    last: {
        type: String,
        required: true,
        maxlength: 25,
        validate: [validate.name, validate.nameError]
    },
    first:{
        type: String,
        required: true,
        maxlength: 25,
        validate: [validate.name, validate.nameError]
    },
    password: {
        type: String,
        required: true,
        validate: [validate.password, validate.passwordError]
    },
    bio: {
        type: String,
        required: false,
    }
});

// User Methods
UserSchema.pre('save', function (next) {
    var user = this;
    var hash;
    if(!this.isModified('password')) {
        return next();
    }
    bcrypt.hash(this.password, SALT_WORK_FACTOR, function(err, hash){
        if(err) {
            return next(err);
        }
        user.password = hash;
        return next();
    });
});

UserSchema.methods.comparePassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, match) {
        if (err) {
            return next(err);
        }
        callback(null, match);
    });
};

UserSchema.methods.public = function(callback){
    callback({
        id: this._id,
        username: this.username,
        email: this.email,
        first: this.first,
        bio: this.bio
    });
};

module.exports = mongoose.model('User', UserSchema);
