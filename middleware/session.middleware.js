var shortid = require("shortid");

const authMiddleware = require("../middleware/auth.middleware");
var Session = require("../models/session.model");
var Book = require("../models/book.model");
//create sessionId
module.exports = async function(req, res, next) {
  var sessionId = req.signedCookies.sessionId;
  var user = res.locals.user
  console.log("hi123",user);
  
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
