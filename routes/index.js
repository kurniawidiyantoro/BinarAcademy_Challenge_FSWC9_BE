var express = require('express');
var router = express.Router();

// import controller
const { UserGameController } = require('../controllers/UserGameController');
const { AuthController } = require('../controllers/AuthController');

// import middleware
const { AuthorizationCheck } = require('../lib/AuthorizationCheck');

/* Auth API */
router.post('/login', AuthController.login);

/* API */
router.post('/usergame/get', AuthorizationCheck, UserGameController.getData);
router.post('/usergame/insert', UserGameController.insertData);

module.exports = router;