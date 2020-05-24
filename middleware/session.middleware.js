var shortid = require("shortid");
var db = require('../db')

module.exports = function(req, res, next) {
  if(!req.signedCookies.sessionId){
    var sessionId = shortid.generate();
    res.cookie("sessions", sessionId ,{ 
      signed: true});
    console.log(sessionId); 
    db.get('sessions')
      .push({id: sessionId})
      .write();
  } 
  
   var na=db.get('sessions').value();
  console.log(na); 
  next();
}
