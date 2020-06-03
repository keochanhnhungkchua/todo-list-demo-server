const shortid= require("shortid");
const db = require("../db");

var Session = require("../models/session.model");

module.exports.index = function(req, res) {
  res.render("cart");
};

module.exports.addToCart =async (req, res ) => {
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;
  var session =await Session.findOne({sessionId : sessionId});
  if(!sessionId){
    res.redirect('/books');
    return;
  }
  var count = session.get('cart.' + bookId ,0);
  session.set('cart.' + bookId ,count + 1);
  await session.save();
  console.log(session)
  // var count = db.get('sessions')
  //               .find({ id : sessionId})
  //               .get('cart.' + bookId ,0)
  //               .value();
  // db.get('sessions')
  //   .find({ id : sessionId})
  //   .set('cart.' + bookId ,count + 1)
  //   .write();
  
  res.redirect('/books');
}

module.exports.hire = (req, res) =>{
  var user = res.locals.user;// middleware/auth.middleware
  var sessionId = req.signedCookies.sessionId;
  var data =db.get("sessions")
              .find({ id: sessionId })
              .value();
  var transactionId = db.get('transactions')
                         .find({userId : user.id})
                         .value(); 
  
  if(!transactionId)
  {
    var transaction = {};
    transaction.id = shortid.generate();
    transaction.userId =  user.id;
    transaction.book = data.cart;
    db.get('transactions')
      .push(transaction)
       .write();
    //empty for cart
    db.get("sessions")
      .find({id: sessionId})
      .unset('cart')
      .write();
    res.redirect("/transactions");
  }else{
    var addBook = Object.assign(transactionId.book,data.cart);
    db.get('transactions')
    .find({ userId: user.id })
    .assign({ book: addBook})
    .write()
    db.get("sessions")
      .find({id: sessionId})
      .unset('cart')
      .write();
    res.redirect("/transactions");
  }
  
   
}