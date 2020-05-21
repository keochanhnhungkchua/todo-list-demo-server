var express = require('express');
var router = express.Router();

var validate = require("../validate/user.validate")
var controller = require("../controller/user.controller")


//get user

router.get("/",controller.index);

router.get("/cookie",function(req, res, next){
  res.cookie('user-id', 12345);
  res.send('hello');
})

router.get("/:id/delete", controller.deleteUser);

router.get("/:id/edit-user" , controller.editUser);

router.get("/userTransaction", controller.userTransaction);//user
//post user
router.post("/create",validate.postCreatUser, controller.postCreateUser);

router.post("/:id/edit-user", controller.postEditUser);

module.exports = router;