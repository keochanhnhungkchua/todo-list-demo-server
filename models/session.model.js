var mongoose = require("mongoose");

var sessionSchema = new mongoose.Schema({
  sessionId : String,
  booksId: Object
});
module.exports = mongoose.model("Session", sessionSchema, 'sessions');