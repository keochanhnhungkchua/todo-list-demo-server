var db = require("../db");

const bcrypt = require("bcrypt");

var user;

module.exports.login = (req, res) => {
  res.render("login");
};

module.exports.postLogin = async(req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  
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
  if(user.wrongLoginCount>3){
    res.render("loginFalse");
    return;
  }
  var match = await bcrypt.compare(password, user.password);
  if (!match){
    db.get("users")
      .find({ email })
      .assign({ wrongLoginCount: user.wrongLoginCount + 1 })
      .write();
   
    res.render("login", {
        errors: ["wrong password"],
        values: req.body
      });
      return;
    }
  db.get("users")
    .find({ email })
    .assign({ wrongLoginCount: 0 })
    .write();
  res.cookie("userId", user.id);
      if (!user.isAdmin) {
        res.redirect("login/userTransaction");
        return;
      } else {
        res.redirect("/");
        return;
      }

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
//login false
module.exports.loginFalse = (req, res) =>
{
  res.render("loginFalse");
}