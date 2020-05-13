var express = require('express');
var router = express.Router();
const shortid= require("shortid");

const db = require("../db");

router.get("/", (req, res) => {
  res.render("transactions",{transactions:db.get("transactions").value()});
});

module.exports= router;