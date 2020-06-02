var mongoose = require("mongoose");

var sessionSchema = new mongoose.Schema({
  id : String,
  booksId: Object
});
module.exports = mongoose.model("Session", sessionSchema, 'sessions');