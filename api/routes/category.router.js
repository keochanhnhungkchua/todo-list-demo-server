var express = require("express");
//const { get } = require("mongoose");
var router = express.Router();
var controller = require("../controllers/category.controller");

router
  .get("/", controller.index)
  .post("/", controller.postCategory)
  .delete("/:todoId", controller.deleteCategory)
  .patch("/:todoId", controller.editCategory);
//router.get("/:id",veryfiToken, controller.userId);
module.exports = router;
