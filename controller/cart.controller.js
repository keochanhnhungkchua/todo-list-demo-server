const shortid = require("shortid");
const db = require("../db");

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
  //console.log(values);
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
  // var count = db.get('sessions')
  //               .find({ id : sessionId})
  //               .get('cart.' + bookId ,0)
  //               .value();
  // db.get('sessions')
  //   .find({ id : sessionId})
  //   .set('cart.' + bookId ,count + 1)
  //   .write();

  res.redirect("/books");
};

module.exports.hire = async (req, res) => {
  var user = res.locals.user; // middleware/auth.middleware
  var sessionId = req.signedCookies.sessionId;
  // var data = db
  //   .get("sessions")
  //   .find({ id: sessionId })
  //   .value();
  var data = await Session.findOne({ sessionId: sessionId });
  // var transactionId = db
  //   .get("transactions")
  //   .find({ userId: user.id })
  //   .value();
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
    console.log(data.cart);
    console.log(user.id);
    console.log(await Transaction.findOne({ userId: user.id }));
    // var transaction = {};
    // transaction.id = shortid.generate();
    // transaction.userId = user.id;
    // transaction.book = data.cart;
    // db.get("transactions")
    //   .push(transaction)
    //   .write();
    // //empty for cart
    // db.get("sessions")
    //   .find({ id: sessionId })
    //   .unset("cart")
    //   .write();

    res.redirect("/transactions");
  } else {
    // var addBook = Object.assign(transactionId.book, data.cart);
    // db.get("transactions")
    //   .find({ userId: user.id })
    //   .assign({ book: addBook })
    //   .write();
    // db.get("sessions")
    //   .find({ id: sessionId })
    //   .unset("cart")
    //   .write();
    Transaction.findByIdAndUpdate(user.id, { booksId: data.cart  });
    await Transaction.save();
    //await Session.findOneAndUpdate({ sessionId }, { cart: {} });
    console.log(await Transaction.findOne({ userId: user.id }));
    res.redirect("/transactions");
  }
};
