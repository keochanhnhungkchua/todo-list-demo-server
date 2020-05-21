var db = require("../db");
var user;

module.exports.login = (req, res) => {
  res.render("login");
};


module.exports.postLogin = (req, res) =>{
 var email = req.body.email;
 var password = req.body.password;
 user = db.get('users')
              .find({email})
              .value();

 if (!user){
    res.render("login",{
      errors:[
        'user does not exists.'
      ],
      values: req.body
    });
    return;
 } 

  if(user.password !== password){
    res.render("login",{
      errors:[
        'wrong password'
      ],
      values: req.body
  });
    return;
  }
res.cookie('userId', user.id); 
  
  if(!user.isAdmin){
    res.redirect("/userTransaction");
  }  
res.redirect("/");
}

//userTransaction when login
module.exports.userTransaction = (req, res) =>{
var userName= user.name;  
var userTransaction = db.get('transactions')
                        .find({userTransaction : userName})
                        .value();  
  console.log(userTransaction);
res.render("userTransaction", {userTransaction});
}