// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();


const userRouter = require("./routes/user.router");
const bookRouter = require("./routes/book.router");
const transactionRouter =  require("./routers/transaction.router")

var bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//home page
app.get("/" , (req, res)=> {
  res.render("index");
});

//get user
app.use("/users", userRouter);
//get books
app.use("/books", bookRouter);
// get transaction
app.use("/transactions", transactionRouter);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
