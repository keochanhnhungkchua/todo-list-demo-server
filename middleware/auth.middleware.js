var db = require('../db')

module.exports.requireAuth = (req, res, next) => {
  console.log(req.cookies, req.signedCookies);
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