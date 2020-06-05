
var Transaction = require("../../models/transaction.model");
var Book = require("../../models/book.model");
var Session = require("../../models/session.model");

module.exports.index = async (req, res) => {
  var user = res.locals.user;
  var transaction = await Transaction.findOne({ userId: user._id });
  if (!transaction) {
    res.redirect("books");
    return;
  } else {
    var items = transaction.booksId;
    var ids = Object.keys(items);
    var values = Object.values(items);
    var book = await Book.find()
      .where("_id")
      .in(ids)
      .exec();
    var i = 0;
    var books = book.map(data => {
      data.quantity = values[i];
      i++;
      return data;
    });
    res.json(books);
  }
};