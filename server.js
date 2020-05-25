require('dotenv').config();

const express = require("express");

const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

const userRouter = require("./routes/user.router");
const bookRouter = require("./routes/book.router");
const transactionRouter =  require("./routes/transaction.router");
const authRouter = require("./routes/auth.router");
const cartRouter = require("./routes/cart.router"); 


const authMiddleware =  require("./middleware/auth.middleware");
const sessionIdMiddleware = require('./middleware/session.middleware');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(cookieParser(process.env.SECRET_COOKIES));
app.use(cookieParser("process.env.SECRET_COOKIES"));
app.use(express.static("public"));

app.use(sessionIdMiddleware);

//home page
app.get("/" , (req, res)=> {
  res.render("index");
});

app.use("/users",authMiddleware.requireAuth , userRouter);
app.use("/books", bookRouter);
app.use("/transactions",authMiddleware.requireAuth , transactionRouter);
app.use("/login", authRouter);
app.use("/cart", cartRouter);


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
