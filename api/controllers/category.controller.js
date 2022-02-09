var Categorys = require("../../models/categorys.model");
var jwt = require("jsonwebtoken");

const decodeToken = function (req) {
  const token = req.header("Authorization").slice(7);
  const decodeJwt = jwt.decode(token, { complete: true }).payload;
  return decodeJwt;
};

module.exports.index = async (req, res) => {
  //const user = decodeToken(req);
  const categorys = await Categorys.find()
    .select("-__v  ")
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(categorys);
};

module.exports.postCategory = async (req, res) => {
  const user = decodeToken(req);
  const newCategory = new Categorys({ ...req.body, email: user.email });
  await newCategory.save();

  return res.status(200).json(newCategory);
};
module.exports.deleteCategory = async (req, res) => {
  const { todoId } = req.params;
  await Categorys.findByIdAndDelete(todoId);
  res.json({ success: true });
};
module.exports.editCategory = async (req, res) => {
  const { todoId } = req.params;
  await Categorys.findByIdAndUpdate(todoId, { $set: req.body }, { new: true });
  const category = await Categorys.findById(todoId);
  res.status(200).json({ success: true, category });
};
