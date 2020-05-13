var express = require('express');
var router = express.Router();
const shortid= require("shortid");

const db = require("../db");

router.get("/", (req, res) => {
  res.render("books",{books:db.get("books").value()});
});

router.get("/:id/delete", (req, res) =>{
  var id = req.params.id;
  db.get("books")
    .remove({id})
    .write();
  res.redirect("back");
} );

router.get("/:id/edit" , (req, res) => {
  var id= req.params.id;
  var book=db.get("books").find({id}).value();
  res.render("edit",{book});
});

router.post("/create", (req, res) => {
  req.body.id=shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("back");
} );

router.post("/:id/edit", (req, res) => {
var id= req.params.id;
  db.get("books")
    .find({id})
    .assign({title:req.body.title})
    .write();
  res.redirect("/books");
});
module.exports= router;