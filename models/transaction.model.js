var mongoose = require("mongoose");
var transactionSchema = new mongoose.Schema({
  userId : String,
  books: Object
});

module.exports = mongoose.model("Transaction", transactionSchema);