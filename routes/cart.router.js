var express = require('express');
var router = express.Router();

var controller = require("../controller/cart.controller");

router.get("/", controller.index);
router.get("/add/:bookId", controller.addToCart);


module.exports= router;