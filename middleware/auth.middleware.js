//var db = require('../db')
var User = require('../models/user.model');

module.exports.requireAuth = async (req, res, next) => {
  var cookie = req.signedCookies.userId;
  console.log(cookie);
  if(!cookie){
    res.redirect('/login');
    return ;
  }
  //var user = db.get('users').find({id : cookie}).value();
  var user =await User.find({id : cookie});
 // console.log(user);
  if(!user){
     res.redirect('/login');
    return ;
  }
  res.locals.user = user;
  next();
}

module.exports.isAdmin = function(req, res, next) {
  var user = res.locals.user;
  if (!user.isAdmin) {
   // res.send("NO PERMISSION!");
    res.redirect('/books');
    return;
  }
  next();
};