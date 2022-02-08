
var Todos = require("../../models/todos.model");

module.exports.index = async (req, res) => {
  var todos = await Todos.find();
  res.json(todos );
};