var Tasks = require("../models/task.model");
var jwt = require("jsonwebtoken");

const decodeToken = function (req) {
  const token = req.header("Authorization").slice(7);
  const decodeJwt = jwt.decode(token, { complete: true }).payload;
  return decodeJwt;
};

module.exports.postTask = async (req, res) => {
  try {
    const user = decodeToken(req);
    const newTask = new Tasks({ ...req.body, userId: user._id });
    await newTask.save();
    return res.status(200).json(newTask);
  } catch (error) {
    res.json(error);
  }
};
module.exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    await Tasks.findByIdAndDelete(taskId);
    res.json({ success: true });
  } catch (error) {
    res.json(error.message);
  }
};
module.exports.editTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const newData = await Tasks.findByIdAndUpdate(
      taskId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ success: true, task: newData });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports.isCompleted = async (req, res) => {
  try {
    const { taskId } = req.params;
    const newData = await Tasks.findByIdAndUpdate(
      taskId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ success: true, task: newData });
  } catch (error) {
    res.json(error.message);
  }
};
