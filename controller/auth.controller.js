
const db = require("../db");

module.exports.login = (req, res) => {
  res.render("users",{users:db.get("users").value()});
};