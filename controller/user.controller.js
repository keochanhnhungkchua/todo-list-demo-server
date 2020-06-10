const shortid = require("shortid");
var cloudinary = require("cloudinary").v2;

//const db = require("../db");
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

module.exports.deleteUser =async (req, res) =>{
  var id=req.params.id;
  // db.get("users")
  //   .remove({id})
  //   .write();
   await User.findByIdAndDelete(id)
  res.redirect("back");
}

module.exports.editUser = async (req, res) => {
  var id = req.params.id;
  var user = await User.findById(id);
  res.render("editUser", { user });
};

//post
module.exports.postCreateUser = async (req, res) => {
 // req.body.id = shortid.generate();
  var avatarUrl;
  if (req.file) {
    cloudinary.uploader.upload(req.file.path, 
                               { tags: "avatar" },
                                await function(err,result){
                                avatarUrl= result.url;
                                });
  }
  req.body.avatar = avatarUrl;
  console.log(req.body.avatar)
    await User.create(req.body, function(err) {
      if (err) return console.log(err);
    });
    res.redirect("back");
  // } else {
  //   // db.get("users")
  //   //   .push(req.body)
  //   //   .write();
  //   await User.create(req.body, function(err) {
  //     if (err) return console.log(err);
  //   });
  //   res.redirect("/users"); }
};

module.exports.postEditUser = async (req, res) => {
  var id = req.params.id;
  if (req.file) {
    cloudinary.uploader.upload(req.file.path, { tags: "avatar" }, function(
      err,
      result
    ) {
      req.body.avatar = result.url;
    });
    await User.findByIdAndUpdate(id, {
      name: req.body.name,
      email: req.body.email,
      avatar: req.body.avatar
    });
    res.redirect("/users");
  } else {
    await User.findByIdAndUpdate(id, {
      name: req.body.name,
      email: req.body.email,
      avatar: req.body.avatar
    });
    res.redirect("/users");
  }
};
