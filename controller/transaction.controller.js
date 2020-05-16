const shortid= require("shortid");

const db = require("../db");

module.exports.index = (req, res) => {
  res.render("transactions",{users: db.get("users").value(),
                             books: db.get("books").value(),
                             transactions:db.get("transactions").value()});
}
module.exports.postC