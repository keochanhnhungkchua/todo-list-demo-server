var express = require('express');
var router = express.Router();

var controller = require("../controller/book.controller");

router.get("/", controller.index);

router.get("/:id/delete", controller.deleteBook);

router.get("/:id/edit" , controller.editBook);
//post
router.post("/create", controller.postBook);

router.post("/:id/edit", controller.postEditBook);
module.exports= router;