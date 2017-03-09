var User = require('../models/user');

var public = {};

public.users = function(req, res, next){
    User.find({}, {username:1, email:1, bio:1}, function(err, users){
        if(err){
            return res.status(400).send({error:'Bad Request'})
        }
        return res.status(200).send(users);
    });
};

module.exports = public;