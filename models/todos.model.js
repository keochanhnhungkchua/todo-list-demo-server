const mongoose = require("mongoose");

const todosSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Todos", todosSchema);
