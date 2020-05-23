var db = require("../db");

const bcrypt = require("bcrypt");

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
  const msg = {
    to: `${user.email}`,
    //from: `${user.email}`,
    from:"tamja9x@gmail.com",
    subject: 'Login Failed',
    text: 'You fail to enter the correct password 3 times in a row when logging in',
      };
    
  sgMail
  .send(msg)
  .then(() => {}, error => {
    console.error(error);
 
    if (error.response) {
      console.error(error.response.body)
    }
  });
    
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
  //create cookie 
  
  res.cookie("userId", user.id ,
             {signed: true});
  
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