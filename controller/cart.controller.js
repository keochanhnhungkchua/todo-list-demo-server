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
  
   var books = res.locals.books;
  //console.log(books)
  // for (var book of books) {
  //   for (var i = 1; i <= book.quantity; i++) {
  //     var transaction = {};
  //     transaction.id = shortid.generate();
  //     transaction.isComplete = false;
  //     transaction.name = `${res.locals.user.name}_${book.title}_${i}`;
  //     transaction.userId = res.locals.user.id;
  //     transaction.bookId = book.id;
  //     db.get("transactions")
  //       .push(transaction)
  //       .write();
  //   }
  // }
  // var sessionId = req.signedCookies.sessionId;
  // db.get("sessions")
  // .find({id: sessionId})
  //    .unset('cart')
  //   .write();
  // res.redirect("/transactions");
}