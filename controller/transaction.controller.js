const shortid= require("shortid");

const db = require("../db");

module.exports.index = (req, res) => {
  res.render("transactions",{users: db.get("users").value(),
                             books: db.get("books").value(),
                             transactions:db.get("transactions").value()});
}
module.exports.postCreateTransaction = (req, res) =>{
  req.body.id=shortid.generate();
  req.body.isComplete = false;
  db.get("transactions")
    .push(req.body)
    .write();
  res.redirect("back");
}


module.exports.complete = (req, res) => {
  let id = req.params.id;
  let transaction = 
  db.get("transactions")
    .find({ id })
    .value();
  if (transaction) {
    db.get("transactions")
      .find({ id })
      .assign({ isComplete: true })
      .write();
    res.redirect("/transactions");
  }
};
