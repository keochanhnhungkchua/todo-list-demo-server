var Task = require("../../models/task.model");

module.exports.index = async (req, res) => {
  var tasks = await Task.find().select("-__v  ");
  res.json(tasks);
};
