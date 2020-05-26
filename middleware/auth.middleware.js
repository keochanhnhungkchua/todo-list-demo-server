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