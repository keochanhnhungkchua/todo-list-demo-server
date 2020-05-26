var shortid = require("shortid");

const authMiddleware = require("../middleware/auth.middleware");
var db = require("../db");

module.exports = function(req, res, next) {
  var sessionId = req.signedCookies.sessionId;
  if (!sessionId) {
    var sessionId = shortid.generate();
    res.cookie("sessionId", sessionId, {
      signed: true
    });
    db.get("sessions")
      .push({ id: sessionId })
      .write();
  }
  var data = db.get("sessions").value();
  data.map(item => {
    if (item.id !== sessionId) {
      db.get("sessions")
        .remove({ id: item.id })
        .write();
    }
  });
  //count number boook in cart
  var session = db
    .get("sessions")
    .find({ id: sessionId })
    .value();
  //get values of ojbect and sum => show (set locals for "quantity" show(index>cart)
  if (session && session.cart) {
    var items = session.cart;
    res.locals.quantity = Object.values(items).reduce((a, b) => a + b);
    var books = Object.keys(items).map(key => {
      var book = db
        .get("books")
        .find({ id: key })
        .value();
      book.quantity = items[key]; //insert quantity
      return book;
    });
    
    res.locals.books = books;
    res.locals.session = session;
  }
    console.log(db.get('sessions').value());
  next();
};
