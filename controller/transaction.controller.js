const shortid = require("shortid");

var Transaction = require("../models/transaction.model");
var Book = require("../models/book.model");
var Session = require("../models/session.model");

module.exports.index = async (req, res) => {
  try {
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
     res.render("transactions", { books });
    }
    console.log(yuryuyu);//demo error by use try catch
  } catch (error) {
    console.log(error);
   // res.render("error");
  }
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
