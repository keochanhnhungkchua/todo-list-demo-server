var shortid = require("shortid");
var db = require('../db')

module.exports = function(req, res, next) {
  var sessionId = req.signedCookies.sessionId;
  console.log(sessionId);
  if(!sessionId){
    var sessionId = shortid.generate();
    res.cookie("sessions", sessionId ,{ 
      signed: true});
    db.get('sessions')
      .push({id: sessionId})
      .write();  
  } 
  next();
}
