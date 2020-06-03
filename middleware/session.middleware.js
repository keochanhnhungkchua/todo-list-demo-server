var shortid = require("shortid");

const authMiddleware = require("../middleware/auth.middleware");
var db = require("../db");
var Session = require("../models/session.model");
var Book = require("../")
//create sessionId
module.exports = async function(req, res, next) {
  var sessionId = req.signedCookies.sessionId;
  if (!sessionId) {
    var sessionId = shortid.generate();
    res.cookie("sessionId", sessionId, {
      signed: true
    });
    // db.get("sessions")
    //   .push({ id: sessionId })
    //   .write();
    //save sessionId in database
    await Session.create({ sessionId: sessionId }, function(err, small) {
      if (err) return console.log(err);
    });
  }else{
    await Session.deleteMany({ sessionId: { $ne: sessionId } });
    var session = await Session.findOne({sessionId : sessionId});
    //console.log(session);  
  }
  // var data = db.get("sessions").value();
  // data.map(item => {
  //   if (item.id !== sessionId) {
  //     db.get("sessions")
  //       .remove({ id: item.id })
  //       .write();
  //   }
  // });
  //count number boook in cart
  // var session = db
  //   .get("sessions")
  //   .find({ id: sessionId })
  //   .value();
  
  //get values quantity of cart=> show(index>cart)
  var session = await Session.findOne({sessionId : sessionId});
  if (session && session.cart) {
    var items = session.cart; 
    console.log(items);
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
  }
  next();
};
