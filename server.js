// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

const userRouter = require("./routes/user.router");
const bookRouter = require("./routes/book.router");
const transactionRouter =  require("./routes/transaction.router");
const authRouter = require("./routers/auth.router");



app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//home page
app.get("/" , (req, res)=> {
  res.render("index");
});


app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/transactions", transactionRouter);
app.use("/auth", authRouter);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
