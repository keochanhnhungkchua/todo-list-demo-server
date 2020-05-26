var db = require('../db')

var controller = require("../controller/auth.controller")

module.exports.requireAuth = (req, res, next) => {
  var cookie = req.signedCookies.userId;
  if(!cookie){
    res.redirect('/login');
    return ;
  }
  var user = db.get('users').find({id : cookie}).value();
  if(!user){
     res.redirect('/login');
    return ;
  }
  next();
}

module.exports.isAdmin = function(req, res, next) {
  var userA = res.locals.user;
  console.log(userA);
  // if (!user.isAdmin) {
  //   res.send("NO PERMISSION!");
  //   //res.redirect('/books');
  //   return;
  // }
  next();
};