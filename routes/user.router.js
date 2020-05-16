var express = require('express');
var router = express.Router();
const shortid= require("shortid");

const db = require("../db");
var controller = require("../controller/user.controller")

//get user
router.get("/", (req, res) => {
  res.render("users",{users:db.get("users").value()});
});
router.get("/:id/delete", (req, res) =>{
  var id=req.params.id;
  db.get("users")
    .remove({id})
    .write();
  res.redirect("back");
});
router.get("/:id/edit-user" , (req, res) => {
  var id= req.params.id;
  var user=db.get("users").find({id}).value();
  res.render("edit-user",{user});
});

//post user
router.post("/create", (req, res) =>{
  req.body.id=shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("back");
});
router.post("/:id/edit-user", (req, res) => {
var id= req.params.id;
  db.get("users")
    .find({id})
    .assign({name:req.body.name})
    .write()
  res.redirect("/users");
});

module.exports = router;