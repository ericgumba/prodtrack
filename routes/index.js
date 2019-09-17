var express = require('express');
var router = express.Router();
var tsk = require('../models/task')
var user_controller = require('../controllers/userController')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express, can I take your order?' });
});

router.post('/register', user_controller.user_create )

router.get('/login', user_controller.user_login)
module.exports = router;


router.post('/update-task')