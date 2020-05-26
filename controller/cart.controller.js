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
  console.log(res.locals.user.id);
   var books = res.locals.books;
  var   id = shortid.generate();
 
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