var express = require("express");
var router = express.Router();

var controller = require("../controller/user.controller");

router.get("/", controller.index);
router.delete("/:userId", controller.deleteUser);
router.patch("/:userId", controller.editUser);

module.exports = router;
