var db =  require("../db");

module.exports.postBook = function (req, res, next) {
  var errors = [];
  if(!req.body.title){
    errors.push('Title is required...')
  }
  if(!req.body.description){
    errors.push('Description is require...')  
  } 
  if (errors.length){
    res.render('books', {books:db.get('books').value(), errors});
    return ;
  }
  
  next();
}