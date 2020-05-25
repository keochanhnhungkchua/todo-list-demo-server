const shortid= require("shortid");
const db = require("../db");

module.exports.index = function(req, res) {
  res.render("cart");
};
module.exports.addToCart = (req, res ) => {
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;
  var data = db.get('sessions').value();
  console.log(sessionId);
  console.log(bookId);
  console.log(data);
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