var db = require('../db')

module.exports.requireAuth = (req, res, next) => {
  var cookie = req.cookie.userID
}