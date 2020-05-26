const shortid= require("shortid");
const db = require("../db");


module.exports.index = function(req, res) {
  res.render("cart");
};
module.exports.addToCart = (req, res ) => {
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;
  
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

module.exports.hire = (req, res) =>{
  var user = res.locals.user;// middleware/auth.middleware
  var sessionId = req.signedCookies.sessionId;
  var data =db.get("sessions")
              .find({ id: sessionId })
              .value();
console.log(data);
  var transactionId = db.get('transactions')
                         .find({userId : user.id})
                         .value(); 
  console.log(transactionId);
  
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
    console.log(addBook);
    // db.get('transactions')
    // .find({ userId: user.id })
    // .assign({ title: 'hi!'})
    // .write()
    
    console.log('1123')
    res.redirect("/transactions");
  }
  
   
}