var express = require("express");
var router = express.Router();

var controller = require("../controller/cart.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", controller.index);
router.get("/add/:bookId", controller.addToCart);
router.get("/hire", authMiddleware.requireAuth, controller.hire);

module.exports = router;
