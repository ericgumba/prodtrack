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

router.post('/create-entry', user_controller.entry_create)

router.post('/create-task', user_controller.task_create)

router.post('/update-task', user_controller.update_task)

router.get('/testquery', user_controller.test_query)


module.exports = router;


router.post('/update-task')