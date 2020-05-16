var express = require('express');
var router = express.Router();
 var controller = require("../controller/transaction.controller");

router.get("/", controller.index);

router.post("/create", (req, res) =>{
  req.body.id=shortid.generate();
  db.get("transactions")
    .push(req.body)
    .write();
  res.redirect("back");
});

module.exports= router;