var express = require("express");
var router = express.Router();

var controller = require("../controllers/auth.controller");

router.post("/login", controller.postLogin);
router.post("/register", controller.postRegister);

module.exports = router;
