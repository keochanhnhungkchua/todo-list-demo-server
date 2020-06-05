
var Book = require("../../models/book.model");

module.exports.index = async (req, res) => {
  var books = await Book.find();
  res.json(books );
};