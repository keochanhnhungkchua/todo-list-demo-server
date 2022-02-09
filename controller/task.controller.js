var Tasks = require("../models/task.model");
var jwt = require("jsonwebtoken");

const decodeToken = function (req) {
  const token = req.header("Authorization").slice(7);
  const decodeJwt = jwt.decode(token, { complete: true }).payload;
  return decodeJwt;
};

module.exports.index = async (req, res) => {
  const user = decodeToken(req);
  const task = await Tasks.find({ email: user.email })
    .sort({ createdAt: -1 })
    .select("-__v  ")
    .limit(20);
  res.json(task);
};

module.exports.postTask = async (req, res) => {
  const { name } = req.body;
  const user = decodeToken(req);

  const newTask = new Tasks({ ...req.body, email: user.email });
  await newTask.save();

  return res.status(200).json(newTask);
};
module.exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
  await Tasks.findByIdAndDelete(taskId);
  res.json({ success: true });
};
module.exports.editTask = async (req, res) => {
  const { taskId } = req.params;
  await Tasks.findByIdAndUpdate(taskId, { $set: req.body }, { new: true });
  const task = await Tasks.findById(taskId);
  res.status(200).json({ success: true, task: task });
};

module.exports.isCompleted = async (req, res) => {
  const { taskId } = req.params;

  await Tasks.findByIdAndUpdate(taskId, { $set: req.body }, { new: true });
  const task = await Tasks.findById(taskId);
  res.status(200).json({ success: true, task: task });
};