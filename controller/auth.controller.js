//var db = require("../db");

var User = require("../models/user.model")

const bcrypt = require("bcrypt");

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



module.exports.login = (req, res) => {
  res.render("login");
};

//check mail
module.exports.postLogin = async(req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  var user = await User.findOne({email : email})
  // var user = db
  //   .get("users")
  //   .find({ email })
  //   .value();
  
  if (!user) {
    res.render("login", {
      errors: ["user does not exists."],
      values: req.body
    });
    return;
  }
  //check wrong login
  if(user.wrongLoginCount>3){
  const msg = {
    to: `${user.email}`,
    //from: `${user.email}`,
    from:"demodemo@gmail.com",
    subject: 'Login Failed',
    text: 'You fail to enter the correct password 3 times in a row when logging in',
    html: '<strong>if you forgot your password click here: <a href="https://glitch.com/~weak-giddy-geometry">change password</a></strong>',
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
  //check pass
  var match = await bcrypt.compare(password, user.password);
  if (!match){
//     db.get("users")
//       .find({ email })
//       .assign({ wrongLoginCount: user.wrongLoginCount + 1 })
//       .write();
   
//     res.render("login", {
//         errors: ["wrong password"],
//         values: req.body
//       });
    user.wrongLoginCount = user.wrongLoginCount + 1;
    await user.save();
    res.render("login", { errors: ["Wrong password"], values: req.body });
    return;
    }
  // db.get("users")
  //   .find({ email })
  //   .assign({ wrongLoginCount: 0 })
  //   .write();
  user.wrongLoginCount = 0;
  await user.save();
  //create cookie 
  
  res.cookie("userId", user.id ,
             {signed: true});
      if (!user.isAdmin) {
        res.redirect("transactions");
        return;
      } else {
        res.redirect("/");
        return;
      }

};

//userTransaction when login
module.exports.userTransaction = (req, res) => {
  var name= res.locals.userName;
  // var userTransaction = db
  //   .get("transactions")
  //   .filter({ userTransaction: name })
  //   .value();
  //res.render("userTransaction", { userTransaction });
};
//login false
module.exports.loginFalse = (req, res) =>
{
  res.render("loginFalse");
}