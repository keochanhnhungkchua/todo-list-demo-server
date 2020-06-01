const shortid = require("shortid");

//const db = require("../db");

var Transaction = require("../models/transaction.model");
var Book = require("../models/book.model")

module.exports.index = (req, res) => {
  var user = res.locals.user;
  console.log(user);
  // var transaction = db
  //   .get("transactions")
  //   .find({ userId: user.id })
  //   .value();
  var transaction = Transaction.findOne({userId : user._id});
  //console.log(transaction);
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
  res.render("transactions");
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
