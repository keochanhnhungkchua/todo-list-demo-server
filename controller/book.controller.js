const shortid= require("shortid");
const db = require("../db");

//get
module.exports.index = (req, res) => {
  res.render("books",{books:db.get("books").value()});
}

module.exports.deleteBook = (req, res) =>{
  var id = req.params.id;
  db.get("books")
    .remove({id})
    .write();
  res.redirect("back");
} 

module.exports.editBook = (req, res) => {
  var id= req.params.id;
  var book=db.get("books").find({id}).value();
  res.render("edit",{book});
}
//post

module.exports.postBook = (req, res) => {
  req.body.id=shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("back");
} 

module.exports.postEditBook = (req, res) => {
var id= req.params.id;
  db.get("books")
    .find({id})
    .assign({title:req.body.title})
    .write();
  res.redirect("/books");
}