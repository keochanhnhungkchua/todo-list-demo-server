var express = require('express');
var router = express.Router();
const shortid= require("shortid");

const db = require("../db");

router.get("/", (req, res) => {
  res.render("transactions",{users: db.get("users").value(),
                             books: db.get("books").value(),
                             transactions:db.get("transactions").value()});
});
router.post("/create", (req, res) =>{
  req.body.id=shortid.generate();
  db.get("transactions")
    .push(req.body)
    .write();
  res.redirect("back");
});

module.exports= router;