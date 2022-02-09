const mongoose = require("mongoose");

const todosSchema = new mongoose.Schema({
  name: String,
  email:String,
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Todos", todosSchema);
