var express = require('express');
var router = express.Router();

var controller = require("../controller/user.controller")

//get user
router.get("/",controller.index);

router.get("/:id/delete", controller.deleteUser);

router.get("/:id/edit-user" , controller.editUser);

//post user
router.post("/create", controller.postCreateUser);

router.post("/:id/edit-user", controller.postEditUser);

module.exports = router;