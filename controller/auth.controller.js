var db = require("../db");
var user;

module.exports.login = (req, res) => {
  res.render("login");
};
 //var userTransaction = db.get('transaction')
               //           .find({userTransaction :user.name})
                //          .value();  
module.exports.userTransaction = (req, res) =>{
var userTransaction = db.get('transaction')
                      .find({userTransaction :user.name})
                      .value();  
res.render("transaction",{users:db.get("users").value()});
}
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