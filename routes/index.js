var express = require('express');
var router = express.Router();
const cors = require('cors');

// import controller
const { UserGameController } = require('../controllers/UserGameController');
const { AuthController } = require('../controllers/AuthController');

// import middleware
const { AuthorizationCheck } = require('../lib/AuthorizationCheck');

router.use(cors({
  origin: '*'
}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* API */
router.get('/usergame/get', AuthorizationCheck, UserGameController.getData);
router.post('/usergame/insert', UserGameController.insertData);

/* Auth API */
router.post('/login', AuthController.login);

module.exports = router;