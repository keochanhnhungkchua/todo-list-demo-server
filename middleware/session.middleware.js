var shortid = require("shortid");
var db = require('../db')

module.exports = function(req, res, next) {
  if(!req.signedCookies.sessionId){
    var sessionId = shortid.generate();
    res.cookie("sessionId", sessionId ,{ 
      signed: true});
    console.log(req.signedCookies.sessionId); 
    db.get('sessionId')
      .push({id: sessionId})
      .write();
  }
  
   db.get('sessionId').value();
  //console.log(sessionId.id);
  next();
}
