const shortid= require("shortid");
const db = require("../db");

module.exports.index = function(req, res, next) {
  res.render("cart");
};
module.exports.addToCart = (req, res ) => {
  var id = req.params.id;
  
}