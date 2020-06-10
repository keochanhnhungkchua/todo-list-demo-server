var shortid = require("shortid");

const authMiddleware = require("../middleware/auth.middleware");
var Session = require("../models/session.model");
var Book = require("../models/book.model");
const User = require("../models/user.model");
//create sessionId
module.exports = async function(req, res, next) {
  var sessionId = req.signedCookies.sessionId;
  var userId = req.signedCookies.userId;
  var user = await User.findById(userId, "-password");
  if(user){
    res.locals.user = user;
    res.locals.isAdmin = user.isAdmin;
  }
  
  if (!sessionId) {
    var sessionId = shortid.generate();
    res.cookie("sessionId", sessionId, {
      signed: true
    });
    await Session.create({ sessionId: sessionId }, function(err, small) {
      if (err) return console.log(err);
    });
  } else {
    await Session.deleteMany({ sessionId: { $ne: sessionId } });
  }

  var session = await Session.findOne({ sessionId: sessionId });
  if (session && Object.keys(session.cart).length > 0) {
    var items = session.cart;
    res.locals.quantity = Object.values(items).reduce((a, b) => a + b);
  }
  next();
};
