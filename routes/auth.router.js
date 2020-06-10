var express = require("express");
var router = express.Router();

var controller = require("../controller/auth.controller");
//get
router.get("/login", controller.login);
router.get("/logout", controller.logout);
router.get("/loginFalse", controller.loginFalse);

router.post("/postLogin", controller.postLogin);

module.exports = router;
