var express = require('express');
var router = express.Router();

var authController = require('../controllers/authentication');
var privateController = require('../controllers/private');

//Authenticated routes.  Example
router.get('/requireslogin', authController.requiresLogin, privateController.aPrivateResource);

module.exports = router;