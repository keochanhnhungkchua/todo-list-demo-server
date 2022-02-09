var express = require("express");
//const { get } = require("mongoose");
var router = express.Router();
var controller = require("../controller/task.controller");

router
  .get("/", controller.index)
  .patch("/:taskId/is-completed", controller.isCompleted)
  .post("/", controller.postTask)
  .delete("/:taskId", controller.deleteTask)
  .patch("/:taskId", controller.editTask);
//router.get("/:id",veryfiToken, controller.userId);
module.exports = router;
