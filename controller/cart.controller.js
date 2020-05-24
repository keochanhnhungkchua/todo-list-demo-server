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
  
  db.get('sessions')
    .find({ sessionId : sessionId})
    .set(cart. +)
  
}