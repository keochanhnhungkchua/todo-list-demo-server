const shortid= require("shortid");

module.exports = (res, req, next) =>{
  if(!req.signedCookies.sessionId){
    res.cookie(sessionId)
  }
}