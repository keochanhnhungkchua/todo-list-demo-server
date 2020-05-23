const shortid= require("shortid");
const db = require("../db");
var cookies=0;

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
  
  if (req.cookies){
  cookies ++; 
  console.log(req.cookies, ':' ,cookies);
  }
  
  var id= req.params.id;
  var user=db.get("users").find({id}).value();
  res.render("edit-user",{user});
}

//post
module.exports.postCreateUser = (req, res) =>{ 
  req.body.id=shortid.generate();
  req.body.avatar = req.file.path.split("/").slice(1).join('/');
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("back");
}

module.exports.postEditUser = (req, res) => {
var id= req.params.id;
  req.body.avatar = req.file.path.split("/").slice(1).join('/');
  db.get("users")
    .find({id})
    .assign({name:req.body.name, avatar:req.body.avatar })
    .write()
  res.redirect("/users");
}