var mongoose = require("mongoose");
var transactionSchema = new mongoose.Schema({
  userId : String,
  booksId: Object
});

module.exports = mongoose.model("Transaction", transactionSchema);