// var db = require("../db");
// module.exports.postCreatUser = function (req, res, next) {
//     let errors = [];
//   if (req.body.name.length > 30) {
//     errors.push("Username must have max 30 characters");
//   }
//   if (req.body.name.length === 0) {
//     errors.push("Username empty...pls enter name")
//   }
//   if (errors.length) {
//     res.render("users", {users: db.get("users").value(), errors });
//     return;
//   }
//   next();
// }