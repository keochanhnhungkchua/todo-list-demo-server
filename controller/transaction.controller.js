const shortid = require("shortid");

//const db = require("../db");

var Transaction = require("../models/transaction.model");
var Book = require("../models/book.model");
var Session = require("../models/session.model");

module.exports.index = async (req, res) => {
  var user = res.locals.user;
  // var transaction = db
  //   .get("transactions")
  //   .find({ userId: user.id })
  //   .value();
  var transaction = await Transaction.findOne({ userId: user._id });
  if (!transaction) {
    res.redirect("books");
    return;
  } else {
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
    console.log(books)
   res.render("transactions", { books });
  }

  // if(!transaction){
  //   res.redirect("books");
  //   return;
  // }
  // else{
  // var items = transaction.books;
  // var books = Object.keys(items).map(key => {
  //   // var book = db
  //   //   .get("books")
  //   //   .find({ id: key })
  //   //   .value();
  //   var book = Book.findOne
  //   book.quantity = items[key]; //insert quantity
  //   return book;
  // });
  // res.render("transactions", { books });
  // }
  // res.render("transactions",{transaction});
};

// module.exports.postCreateTransaction = (req, res) => {
//   req.body.id = shortid.generate();
//   req.body.isComplete = false;
//   db.get("transactions")
//     .push(req.body)
//     .write();
//   res.redirect("back");
// };

// module.exports.complete = (req, res) => {
//   let id = req.params.id;
//   let transaction = db
//     .get("transactions")
//     .find({ id })
//     .value();
//   if (transaction) {
//     db.get("transactions")
//       .find({ id })
//       .assign({ isComplete: true })
//       .write();
//     res.redirect("/transactions");
//   }
// };
