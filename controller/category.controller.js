var Categories = require("../models/category.model");
var Tasks = require("../models/task.model");
var jwt = require("jsonwebtoken");

const decodeToken = function (req) {
  const token = req.header("Authorization").slice(7);
  const decodeJwt = jwt.decode(token, { complete: true }).payload;
  return decodeJwt;
};

module.exports.index = async (req, res) => {
  try {
    const user = decodeToken(req);
    const categories = await Categories.find({ userId: user._id })
      .select("-__v  ")
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(categories);
  } catch (error) {
    res.json(error);
  }
};

module.exports.getCategoryById = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const tasks = await Tasks.find({ categoryId })
      .select("-__v  ")
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(tasks);
  } catch (error) {
    res.json(error);
  }
};

module.exports.postCategory = async (req, res) => {
  try {
    const user = decodeToken(req);
    const newCategory = new Categories({ ...req.body, userId: user._id });
    await newCategory.save();
    return res.status(200).json(newCategory);
  } catch (error) {
    res.json(error);
  }
};
module.exports.deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    await Tasks.deleteMany({ categoryId });
    await Categories.findByIdAndDelete(categoryId);
    res.json({ success: true });
  } catch (error) {
    res.json(error.message);
  }
};
module.exports.editCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const newCategory = await Categories.findByIdAndUpdate(
      categoryId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ success: true, category: newCategory });
  } catch (error) {
    res.json(error.message);
  }
};
