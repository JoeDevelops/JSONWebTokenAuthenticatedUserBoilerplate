var express = require('express');
var router = express.Router();

var authController = require('../controllers/authentication');

// // Authenticated routes.  Example
// router.get('/requireslogin', authController.requiresLogin, authController.privateResource);

module.exports = router;
