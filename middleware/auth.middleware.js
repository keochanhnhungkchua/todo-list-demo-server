var db = require('../db')

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
  res.locals.user = user;
  res.locals.isAdmin = user.isAdmin;
  next();
}

module.exports.isAdmin = function(req, res, next) {
  if (!res.locals.isAdmin) {
    //res.send("NO PERMISSION!");
    res.redirect('/books');
    return;
  }
  next();
};