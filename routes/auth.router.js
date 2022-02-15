var express = require("express");
var router = express.Router();
var controller = require("../controller/auth.controller");
router.post("/login", controller.postLogin);
router.post("/sign-up", controller.postSignUp);
module.exports = router;
