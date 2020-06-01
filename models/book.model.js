var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
  
  "title": String,
  "description": String,
  "image": {
      type: String,
      default:
        "https://responsiblefinance.org.uk/wp-content/uploads/2015/08/aba-04.png"
      }
});
module.exposts = mongoose.model('Book', bookSchema);