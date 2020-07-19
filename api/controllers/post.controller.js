var Post = require("../../models/post.model");

module.exports.postAdd = async (req, res) => {
  const token = req.header('Authorization').slice(7);
  //const posts = await Post.find();
  //res.json(posts);

  return res.json({
    success: "true transactions"
  });
};
