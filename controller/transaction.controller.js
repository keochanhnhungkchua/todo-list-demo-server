const shortid= require("shortid");

const db = require("../db");

module.exports.index = (req, res) => {
  //var user = res.locals.user
  var transactions = db.get('transactions')
                      //.find({userId : user.id})
                      .value()  
  console.log(transactions)
  res.render("transactions", transactions);
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
