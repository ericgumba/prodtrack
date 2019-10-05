var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express, can I take your order?' });
});

router.post('/register', user_controller.user_create )

router.post('/login', user_controller.user_login)
router.post('/update', user_controller.user_update)

// router.post('/create-entry', user_controller.entry_create)

// router.post('/create-task', user_controller.task_create)

// router.post('/update-task', user_controller.update_task)

// router.post('/edit-task', user_controller.edit_task)

// router.post("/delete-task", user_controller.delete_task)
 


module.exports = router;
 