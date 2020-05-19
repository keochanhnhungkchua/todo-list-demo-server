var db = require("../db");

module.exports.login = (req, res) => {
  res.render("login");
};

module.exports.postLogin = (req, res) =>{
 var email = req.body.email;
 var password = req.body.password;
 var user = db.get("users")
              .find({email:email})
              .value();
  
 if (!user){
    res.render("login",{
      errors:[
        'user does not exists.'
      ]
    });
    return;
 } 

  if(user.password !== password){
    res.render("login",{
      errors:[
        'user does not exists.'
      ]
  });
    return;
  }
               
res.redirect("/users");
}