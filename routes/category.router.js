var express = require("express");
//const { get } = require("mongoose");
var router = express.Router();
var controller = require("../controller/category.controller");

router
  .get("/", controller.index)
  .post("/", controller.postCategory)
  .get("/:categoryId", controller.getCategoryById)
  .delete("/:categoryId", controller.deleteCategory)
  .patch("/:categoryId", controller.editCategory);
//router.get("/:id",veryfiToken, controller.userId);
module.exports = router;
