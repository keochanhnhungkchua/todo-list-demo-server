var express = require("express");
var router = express.Router();

var controller = require("../controller/auth.controller");
//get
router.get("/", controller.login);

router.get("/userTransaction", controller.userTransaction);

router.get("/loginFalse", controller.loginFalse);

router.post("/", controller.postLogin);

router.get("/", controller.logout);

module.exports = router;
