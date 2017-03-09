var User = require('../models/user');
var jwt = require('jwt-simple');
var jwtConfig = require('../config/jwtConfig');
var tokens = require('../middleware/tokens');
var moment = require('moment');

var auth = {};

auth.register = function(req, res, next){
    var formattedUsername = req.sanitize(req.body.username);
    var username = formattedUsername.toLowerCase();
    var email = req.sanitize(req.body.email);
    var first = req.sanitize(req.body.first);
    var last = req.sanitize(req.body.last);
    var password = req.sanitize(req.body.password);
    var confirm = req.sanitize(req.body.confirm);

    if(!username){
        return res.status(422).send(
            {
                error: 'Enter your username.',
                message: 'Registration failed.'
            }
        );
    }

    if(!email){
        return res.status(422).send(
            {
                error: 'Enter your email.',
                message: 'Registration failed.'
            }
        );
    }

    if(!(first && last)){
        return res.status(422).send(
            {
                error: 'Enter your full name.',
                message: 'Registration failed.'
            }
        );
    }

    if(!confirm==password){
        return res.status(422).send(
            {
                error: 'Passwords do not match.',
                message: 'Registration failed.'
            }
        );
    }

    var user = new User(
        {
            username: username,
            formattedUsername: formattedUsername,
            email: email,
            first: first,
            last: last,
            password: password
        }
    ).save(function(err, user){
        if(err){
            return res.status(400).send(
                {
                    error: err,
                    message: 'Registration failed.'
                }
            );
        }
        var cleanedUser = user;
        cleanedUser.password = '-';
        return res.status(201).send({ user: cleanedUser });
    });
};

auth.login = function(req, res, next){
    var username = req.sanitize(req.body.username).toLowerCase();
    var password = req.sanitize(req.body.password);

    User.findOne({username:username}, function(err, user){
        user.comparePassword(password, function(err, match){
            if(err){
                return res.status(400).send(
                    {
                        error: err,
                        message: 'Login failed.'
                    }
                );
            }

            if(!match){
                return res.status(400).send(
                    {
                        error: 'Invalid credentials.',
                        message: 'Login failed.'
                    }
                );
            }
            var cleanedUser = user;
            cleanedUser.password = '-';
            var expires = moment().add(1, 'days');
            var token = jwt.encode(
                {
                    iss: user._id,
                    expires: expires,
                    user: cleanedUser

                }, jwtConfig.jwtSecret);

            return res.status(200).send(
                {
                    token: token,
                    expires: expires,
                    user: cleanedUser,
                    message: 'Login Success'
                }
            );
        })
    });
};

auth.requiresLogin = function(req, res, next){
    var token = req.sanitize(req.headers.token)
    tokens.isValidToken(token, function(err, valid, token){
        if(valid){
            return next();
        }
        return res.status(401).send({error: err});
    });
};

auth.requiresUserAccess = function(req, res, next){
    tokens.isValidTokenForUser(req.headers.token, req.params.username, function(err, valid, token){
        if(valid){
            return next();
        }
        return res.status(401).send({error: err});
    });
};

module.exports = auth;