var express = require("express");
var router = express.Router();
var controller = require("../controller/transaction.controller");

router.get("/", controller.index);

 router.get("/:id/editTransaction", controller.editTransaction);

// router.post("/create", controller.postCreateTransaction);

// router.get("/:id/complete", controller.complete);

module.exports = router;
