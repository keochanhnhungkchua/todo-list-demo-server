
var cloudinary = require("cloudinary").v2;

var User = require("../models/user.model");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports.index = async (req, res) => {
  var users = await User.find();
  res.render("users", { users });
};

module.exports.deleteUser = async (req, res) => {
  var id = req.params.id;
  await User.findByIdAndDelete(id);
  res.redirect("back");
};

module.exports.editUser = async (req, res) => {
  var id = req.params.id;
  var user = await User.findById(id);
  res.render("editUser", { user });
};

//post
module.exports.postCreateUser = async (req, res) => {
  if (req.file) {
    cloudinary.uploader.upload(
      req.file.path,
      { tags: "avatar" },
      await function(err, result) {
        req.body.avatar = result.url;
        User.create(req.body)
          .then(user => res.redirect("/users"))
          .catch(err => console.log(err));
      }
    );
  } else {
    await User.create(req.body, function(err) {
      if (err) return console.log(err);
    });
    res.redirect("/users");
  }
};

module.exports.postEditUser = async (req, res) => {
  var id = req.params.id;
  if (req.file) {
    cloudinary.uploader.upload(req.file.path, { tags: "avatar" }, function(
      err,
      result
    ) {
      req.body.avatar = result.url;
      User.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => res.redirect("/users"))
        .catch(err => console.log(err));
    });
  } else {
    User.findByIdAndUpdate(id, req.body, { new: true })
      .then(user => res.redirect("/users"))
      .catch(err => console.log(err));
    res.redirect("/users");
  }
};
