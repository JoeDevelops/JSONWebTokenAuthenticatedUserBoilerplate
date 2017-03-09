var jwt = require('jwt-simple');
var jwtConfig = require('../config/jwtConfig');
var moment = require('moment');
tokens = {};

tokens.isValidToken = function(token, callback){
    var errorMessage;
    try{
        var decoded = jwt.decode(token, jwtConfig.jwtSecret, jwtConfig.algorithm);
        const expiration = decoded.expires;
        if(moment() > expiration) {
            errorMessage = "Expired token.  Please log in.";
            callback(errorMessage, false, null);
        }
        else{
            callback(null, true, decoded);
        }
    }
    catch(err){
        errorMessage = "Unauthorized user.  Please log in."
        callback(errorMessage, false, null);
    }
};

tokens.isValidTokenForUser = function(token, username, callback){
    var errorMessage;
    try{
        var decoded = jwt.decode(token, username, jwtConfig.jwtSecret, jwtConfig.algorithm);
        const expiration = decoded.expires;
        var tokenUser = decoded.user.username;
        if(tokenUser != username.toLowerCase()){
            errorMessage = "Unauthorized access for requested resource.";
            callback(errorMessage, false, null);
        }
        else{
            if(moment() > expiration) {
                errorMessage = "Expired token.  Please log in.";
                callback(errorMessage, false, null);
            }
            else{

                callback(null, true, decoded);
            }
        }
    }
    catch(err){
        errorMessage = "Unauthorized user.  Please log in."
        callback(errorMessage, false, null);
    }
};

module.exports = tokens;