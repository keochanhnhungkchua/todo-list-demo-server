var Session = require("../models/session.model");
var Book = require("../models/book.model");
var Transaction = require("../models/transaction.model");

module.exports.index = async function(req, res) {
  var sessionId = req.signedCookies.sessionId;
  var session = await Session.findOne({ sessionId: sessionId });
  var items = session.cart;

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
  res.render("cart", { books });
};

module.exports.addToCart = async (req, res) => {
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;
  var session = await Session.findOne({ sessionId: sessionId });
  if (!sessionId) {
    res.redirect("/books");
    return;
  }
  var count = session.get("cart." + bookId) || 0;
  session.set("cart." + bookId, count + 1);
  await session.save();
  res.redirect("/books");
};

module.exports.hire = async (req, res) => {
  var user = res.locals.user; // middleware/auth.middleware
  var sessionId = req.signedCookies.sessionId;
  var data = await Session.findOne({ sessionId: sessionId });
  var transactionId = await Transaction.findOne({ userId: user.id });
  if (!transactionId) {
    var item = {
      booksId: data.cart,
      userId: user.id
    };
    await Transaction.create(item, function(err, small) {
      if (err) return console.log(err);
    });
    await Session.findOneAndUpdate({ sessionId }, { cart: {} });

    res.redirect("/transactions");
  } else {
    var transaction = await Transaction.findOne({ userId: user.id });
    var addBook = Object.assign(transaction.booksId, data.cart);
    await Transaction.findOneAndUpdate(
      { userId: user.id },
      { booksId: addBook }
    );
    await Session.findOneAndUpdate({ sessionId }, { cart: {} });
    res.redirect("/transactions");
  }
};
