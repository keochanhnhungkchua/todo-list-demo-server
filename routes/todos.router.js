var express = require("express");
const { get } = require("mongoose");
var router = express.Router();
var controller = require("../controller/todos.controller");

router
  .get("/", controller.index)
  .put("/:todoId/is-completed", controller.isCompleted)
  .post("/", controller.postTodo)
  .delete("/:todoId", controller.deleteTodo)
  .put("/:todoId", controller.editTodo);
//router.get("/:id",veryfiToken, controller.userId);
module.exports = router;
