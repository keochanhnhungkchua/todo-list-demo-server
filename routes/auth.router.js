var express = require('express');
var router = express.Router();

var validate = require("../validate/user.validate")
var controller = require("../controller/user.controller")
router.get("/",controller.login);

module.exports = router;