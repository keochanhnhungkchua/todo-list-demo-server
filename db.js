const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');

const db = low(adapter);

// Set some defaults
db.defaults({ books: []})
  .write()
db.defaults({ users: []})
  .write()
db.defaults({ transactions: []})
  .write()
module.exports= db;