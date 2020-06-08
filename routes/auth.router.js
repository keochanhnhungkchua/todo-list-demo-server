var express = require("express");
var router = express.Router();

var controller = require("../controller/auth.controller");
//get
//router.get("/", controller.login);
router.get("/", controller.logout);

router.get("/userTransaction", controller.userTransaction);

router.get("/loginFalse", controller.loginFalse);

router.post("/", controller.postLogin);



module.exports = router;
