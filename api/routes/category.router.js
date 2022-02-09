var express = require("express");
//const { get } = require("mongoose");
var router = express.Router();
var controller = require("../controllers/category.controller");

router
  .get("/", controller.index)
  .post("/", controller.postTodo)
  .delete("/:todoId", controller.deleteTodo)
  .patch("/:todoId", controller.editTodo);
//router.get("/:id",veryfiToken, controller.userId);
module.exports = router;
