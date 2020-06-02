var mongoose = require("mongoose");

var sessionSchema = new mongoose.Schema({
  userId : String,
  booksId: Object
});