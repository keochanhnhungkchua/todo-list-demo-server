const shortid= require("shortid");
const db = require("../db");


module.exports.index = function(req, res) {
  res.render("cart");
};
module.exports.addToCart = (req, res ) => {
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;
  var data = db.get('sessions')
  .find({ id : sessionId})
  .value();
  if(!sessionId){
    res.redirect('/books');
    return;
  }
  var count = db.get('sessions')
                .find({ id : sessionId})
                .get('cart.' + bookId ,0)
                .value();
  db.get('sessions')
    .find({ id : sessionId})
    .set('cart.' + bookId ,count + 1)
    .write();
console.log(db.get('sessions').value());
  res.redirect('/books');
}

module.exports.hire = (req, res ) =>{
  var user = res.locals.user;// middleware/auth.middleware.js-15
  var books = res.locals.books;// middleware/session.middleware.js - 47
  var userId = db.get('transactions')
     .find({userId : user.id})
     .value(); 
  console.log(books);
  if(!userId){
    var transaction ={};
    transaction.id = user.id;
    transaction.bookId = books.id;
    transaction.quantity= books.quantity;
   // console.log(transaction)
    // db.get('transactions')
    //   .push(transaction)
    //   .write();
    //console.log(transaction)
    // var sessionId = req.signedCookies.sessionId;
    // db.get("sessions")
    // .find({id: sessionId})
    //    .unset('cart')
    //   .write();
    // res.redirect("/transactions"); 
  }
  //     db.get("transactions")
  //       .push(transaction)
  //       .write();
     
   
  // var sessionId = req.signedCookies.sessionId;
  // db.get("sessions")
  // .find({id: sessionId})
  //    .unset('cart')
  //   .write();
  // res.redirect("/transactions");
}