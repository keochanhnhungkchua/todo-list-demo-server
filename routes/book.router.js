var express = require("express");
var router = express.Router();

var controller = require("../controller/book.controller");
var validate = require("../validate/book.validate");

router.get("/", controller.index);

// router.get("/:id/delete", controller.deleteBook);

// router.get("/:id/edit" , controller.editBook);
// //post
// router.post("/create",validate.postBook, controller.postBook);

// router.post("/:id/edit", controller.postEditBook);
module.exports = router;
