var private = {};

private.aPrivateResource = function(req, res, next){
  console.log("This resource can only be accessed with a valid token.");
  console.log("We don't have to worry about authentication here...");
  console.log("Because our code is modular and our concerns are separated!");
  res.status(200).send({
    message: 'You are an authenticated user.  You can access sensitive data.',
    wasEasy: true,
  });
};

module.exports = private;