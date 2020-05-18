const shortid= require("shortid");
const db = require("../db");

module.exports.index = (req, res) => {
  res.render("users",{users:db.get("users").value()});
};

module.exports.deleteUser = (req, res) =>{
  var id=req.params.id;
  db.get("users")
    .remove({id})
    .write();
  res.redirect("back");
}

module.exports.editUser = (req, res) => {
  var id= req.params.id;
  var user=db.get("users").find({id}).value();
  res.render("edit-user",{user});
}

//post
module.exports.postCreateUser = (req, res) =>{
  let errors = [];
  if (req.body.name.length > 30) {
    errors.push("Username must have max 30 characters");
  }
  if (errors.length) {
    res.render("users", {users: db.get("users").value(), errors });
    return;
  }
  
  req.body.id=shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("back");
}

module.exports.postEditUser = (req, res) => {
var id= req.params.id;
  db.get("users")
    .find({id})
    .assign({name:req.body.name})
    .write()
  res.redirect("/users");
}