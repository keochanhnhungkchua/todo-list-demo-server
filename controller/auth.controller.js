var db = require("../db");

const bcrypt = require("bcrypt");

var user;

module.exports.login = (req, res) => {
  res.render("login");
};

module.exports.postLogin = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  //var hashedPassword = md5(password);
  user = db
    .get("users")
    .find({ email })
    .value();
  if (!user) {
    res.render("login", {
      errors: ["user does not exists."],
      values: req.body
    });
    return;
  }
bcrypt.compare(password, user.password, function(err, result) {
    if (result) {
      res.cookie("userId", user.id);
      if (!user.isAdmin) {
        res.redirect("login/userTransaction");
        return;
      } else {
        res.redirect("/");
        return;
      }
    } else {
      res.render("login", {
        errors: ["wrong password"],
        values: req.body
      });
      return;
    }
  });
};

//userTransaction when login
module.exports.userTransaction = (req, res) => {
  var name = user.name;
  var userTransaction = db
    .get("transactions")
    .filter({ userTransaction: name })
    .value();
  res.render("userTransaction", { userTransaction });
};
