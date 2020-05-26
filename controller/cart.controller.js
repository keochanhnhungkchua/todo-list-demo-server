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

  res.redirect('/books');
}

module.exports.hire = (req, res ) =>{
  var user = res.locals.user;
  var books = res.locals.books;
  var   id = shortid.generate();
  var userId = db.get('transactions')
     .find({userId : user.id})
     .value(); 
  var transactions = db.get('transactions')
                      .value();

 // if(!userId){
    transaction.id = id;
    transaction.userId = user.id;
  //  transaction.bookId = books.id;
    console.log(transaction)
    db.get('transactions')
      .push(transaction)
      .write();
    //console.log(transaction)
    // var sessionId = req.signedCookies.sessionId;
    // db.get("sessions")
    // .find({id: sessionId})
    //    .unset('cart')
    //   .write();
    // res.redirect("/transactions"); 
 // }
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