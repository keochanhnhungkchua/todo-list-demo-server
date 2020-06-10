require("dotenv").config();

const express = require("express");

const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var url =
  "mongodb+srv://admin:123a123@keochanhnhungkchua-nzm8q.gcp.mongodb.net/book-store?retryWrites=true&w=majority";

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false
// });
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.connection.on("connected", () => {
  console.log("connect mongo db");
});

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
var options = {
  customCss: '.swagger-ui .topbar { display: none }'
};
 
const userRouter = require("./routes/user.router");
const bookRouter = require("./routes/book.router");
const transactionRouter = require("./routes/transaction.router");
const authRouter = require("./routes/auth.router");
const cartRouter = require("./routes/cart.router");

const apiTransactionRouter = require("./api/routes/transaction.router");
const apiAuthRouter = require("./api/routes/auth.router");
const apiBookRouter = require("./api/routes/book.router");

const authMiddleware = require("./middleware/auth.middleware");
const sessionIdMiddleware = require("./middleware/session.middleware");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser("process.env.SECRET_COOKIES"));

app.use(sessionIdMiddleware);

//home page
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/users",authMiddleware.requireAuth,authMiddleware.isAdmin , userRouter);
app.use("/books", bookRouter);
app.use("/transactions", authMiddleware.requireAuth, transactionRouter);
app.use("/auth", authRouter);
app.use("/cart", cartRouter);

app.use("/api/transactions", apiTransactionRouter);
app.use("/api/login", apiAuthRouter);
app.use("/api/books", apiBookRouter);

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
