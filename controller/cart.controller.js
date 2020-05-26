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
  var user = res.locals.user;// middleware/auth.middleware
  var session = res.locals.session;// middleware/session.middleware
  var userId = db.get('transactions')
     .find({userId : user.id})
     .value(); 
  
  if(!userId){
    var transaction ={};
    transaction.id = user.id;
//    transaction.books = session.cart;
    db.get('transactions')
      .push(transaction)
       .write();
    console.log(db.get('transactions').value());
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