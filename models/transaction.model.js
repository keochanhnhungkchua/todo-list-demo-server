var mongoose = require("mongoose");
var transactionSchema = new mongoose.Schema({
  userId: String,
  booksId: {
    type: Object,
    default: {}
  }
});

module.exports = mongoose.model("Transaction", transactionSchema);
