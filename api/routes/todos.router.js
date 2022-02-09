var express = require("express");
var router = express.Router();
var controller = require("../controllers/post.controller");


//add new post
router.post("/add",controller.todoAdd);
//get all post
router.get("/",controller.index);
//get by post of user
router.get("/:id",controller.userId);

module.exports = router;