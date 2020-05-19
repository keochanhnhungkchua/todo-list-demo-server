var db = require("../db");

module.exports.login = (req, res) => {
  res.render("login");
};

module.exports.postLogin = (req, res) =>{
 var email = req.body.email;
 var password = req.body.password;
 var user = db.get('users')
              .find({email})
              .value();
  console.log(user);
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
res.redirect("/users");
}