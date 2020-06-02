var mongoose = require("mongoose");

var sessionSchema = new mongoose.Schema({
  userId : String,
  booksId: Object
});
module.exports = mongoose.model("Session", sessionSchema);