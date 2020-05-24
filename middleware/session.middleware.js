const shortid= require("shortid");

module.exports = (res, req, next) =>{
  if(!req.signedCookies.sessionId){
    var sessionId = shortid.generate();
    res.cookie('sessionId',sessionId ,{ signed: true});
  }
  next();
}