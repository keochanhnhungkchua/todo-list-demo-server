var User = require("../models/user.model");

module.exports.requireAuth = async (req, res, next) => {
  var cookie = req.signedCookies.userId;
  if (!cookie) {
    res.redirect("auth/login");
    return;
  }
  var user = await User.findOne({ _id: cookie });
  if (!user) {
    res.redirect("auth/login");
    return;
  }
  res.locals.user = user;
  next();
};

module.exports.isAdmin = function(req, res, next) {
  var user = res.locals.user;
  if (!user.isAdmin) {
    res.redirect("/books");
    return;
  }
  next();
};
