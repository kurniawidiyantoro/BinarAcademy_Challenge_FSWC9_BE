var express = require('express');
var router = express.Router();

// import controller
const { UserGameController } = require('../controllers/UserGameController');
const { AuthController } = require('../controllers/AuthController');
const FirebaseController  = require('../controllers/FirebaseController');
// import middleware
const { AuthorizationCheck } = require('../lib/AuthorizationCheck');

// halaman root
router.get("/", (req, res) => res.send("hello team 2"));

/* Auth API */
router.post('/login', AuthController.login);

/* API */
router.post('/usergame/insert', UserGameController.insertData);
router.post('/usergame/upload-profile-pic', FirebaseController.FirebaseController.uploadImage);
router.post('/usergame/get', AuthorizationCheck, UserGameController.getData);
router.post('/usergame/update/profile', AuthorizationCheck, UserGameController.updateProfile);
router.post('/usergame/update/password', AuthorizationCheck, UserGameController.updatePassword);
router.post('/usergame/update/scores', AuthorizationCheck, UserGameController.updateScores);
router.post('/usergame/getProfilePicUrl', AuthorizationCheck, FirebaseController.FirebaseController.getProfilePicUrl);


module.exports = router;