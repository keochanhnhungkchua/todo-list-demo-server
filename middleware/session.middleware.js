var shortid = require("shortid");
var db = require('../db')

module.exports = function(req, res, next) {
  var sessionId = req.signedCookies.sessionId;
  if(!sessionId){
    var sessionId = shortid.generate();
    res.cookie("sessionId", sessionId ,{ 
      signed: true});
    db.get("sessions")
      .push({id: sessionId})
      .write();  
  } 
  var data = db.get('sessions').value();
     data.map(item => {
       if(item.id !== sessionId){
         db.get('sessions')
           .remove({id : item.id})
           .write();
       }
     });
  //count number boook in cart
  var session = db.get('sessions')
                  .find({id : sessionId})
                  .value();
  //console.log(session);
  //get values of ojbect and sum => show (set locals for "quantity" show(index>cart)
 res.locals.quantity = Object.values(session.cart)
                              .reduce( (a , b) => a + b);
  var items = session.cart;
  var books = Object.keys(session.cart).map( key => {
   var book = db.get("books")
                .find({id : key})
                .value();
       book.quantity = items[key];
    return book
  });
  res.locals.books=books;
  next();
}