var express = require('express');
var router = express.Router();

var controller = require("../controller/auth.controller")
//get
router.get("/", controller.login)

router.post("/", controller.postLogin)

module.exports = router;