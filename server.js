// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const shortid= require("shortid");
const low = require('lowdb');
var bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.set('views', './views');

const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



// Set some defaults
db.defaults({ books: []})
  .write()
db.defaults({ users: []})
  .write()

//home page
app.get("/" , (req, res)=> {
  res.render("index");
});
//get books
app.get("/books", (req, res) => {
  res.render("books",{books:db.get("books").value()});
});

app.get("/books/:id/delete", (req, res) =>{
  var id = req.params.id;
  db.get("books")
    .remove({id})
    .write();
  res.redirect("back");
} );

app.get("/books/:id/edit" , (req, res) => {
  var id= req.params.id;
  var book=db.get("books").find({id}).value();
  res.render("edit",{book});
});

//get user
app.get("/users", (req, res) => {
  res.render("users",{users:db.get("users").value()});
});

//post books
app.post("/books/create", (req, res) => {
  req.body.id=shortid.generate();
  db.get("books")
    .push(req.body)
    .write();
  res.redirect("back");
} );

app.post("/books/:id/edit", (req, res) => {
var id= req.params.id;
  db.get("books")
    .find({id})
    .assign({title:req.body.title})
    .write();
  res.redirect("/books");
});
//post user
app.post("/users/create", (req, res) =>{
  req.body.id=shortid.generate();
  db.get("users")
    .push(req.body)
    .write();
  res.redirect("back");
});
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
