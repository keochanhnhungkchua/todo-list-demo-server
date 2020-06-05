var express = require("express");
var router = express.Router();
var controller = require("../controller/transaction.controller");

router.get("/", controller.index);
module.exports = router;
