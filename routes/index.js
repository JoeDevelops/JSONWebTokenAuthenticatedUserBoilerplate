'use strict';

var express = require('express');
var router = express.Router();

var authController = require('../controllers/authentication');
var publicController = require('../controllers/public');

router.get('/', function(req, res, next) {
    res.status(200).json({'message':'Welcome to the MarketPlay API'});
});

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/users', publicController.users);

module.exports = router;
