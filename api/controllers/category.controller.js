var Todos = require("../../models/categorys.model");
var jwt = require("jsonwebtoken");

const decodeToken = function (req) {
  const token = req.header("Authorization").slice(7);
  const decodeJwt = jwt.decode(token, { complete: true }).payload;
  return decodeJwt;
};

module.exports.index = async (req, res) => {
  const user = decodeToken(req);
  const todos = await Todos.find().sort({ createdAt: -1 }).limit(20).select("-__v  ");
  res.json(todos);
};

module.exports.postTodo = async (req, res) => {
  const { name } = req.body;
  const user = decodeToken(req);

  const newTodo = new Todos({
    name: name,
    email: user.email,
  });
  await newTodo.save();

  return res.status(200).json(newTodo);
};
module.exports.deleteTodo = async (req, res) => {
  const { todoId } = req.params;
  await Todos.findByIdAndDelete(todoId);
  res.json({ success: true });
};
module.exports.editTodo = async (req, res) => {
  const { todoId } = req.params;
  await Todos.findByIdAndUpdate(todoId, { $set: req.body }, { new: true });
  const todo = await Todos.findById(todoId);
  res.status(200).json({ success: true, todo: todo });
};
