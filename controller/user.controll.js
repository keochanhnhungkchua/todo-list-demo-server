
module.exports.index = (req, res) => {
  res.render("users",{users:db.get("users").value()});
};