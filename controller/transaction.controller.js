const shortid= require("shortid");

const db = require("../db");

module.exports.index = (req, res) => {
  res.render("transactions",{users: db.get("users").value(),
                             books: db.get("books").value(),
                             transactions:db.get("transactions").value()});
}
module.exports.postCreateTransaction = (req, res) =>{
  req.body.id=shortid.generate();
  db.get("transactions")
    .push(req.body)
    .write();
  res.redirect("back");
}