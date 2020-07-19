var Post = require("../../models/post.model");

module.exports.index = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);

//   return res.json({
//     success: "true transactions",
//     transactions: transactions
//   });
};
