var express = require('express');
var router = express.Router();
var usersContoller=require('../controllers/users.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 
router.post('/login',usersContoller.login);
router.post('/register',usersContoller.register);
router.get('/verify',usersContoller.verify);
router.post('/logout',usersContoller.logout);
router.post('/getUser',usersContoller.getUser);
router.post('/findPassword',usersContoller.findPassword);

module.exports = router;
