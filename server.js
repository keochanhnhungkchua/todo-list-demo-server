require("dotenv").config();

var express = require("express");

var cors = require("cors");

const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("connect mongo db");
});

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
var options = {
  customCss: ".swagger-ui .topbar { display: none }",
};

const userRouter = require("./routes/user.router");
const authRouter = require("./routes/auth.router");
const categoryRouter = require("./routes/category.router");
const tasksRouter = require("./routes/tasks.router");

const authMiddleware = require("./middleware/auth.middleware");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser("process.env.SECRET_COOKIES"));

//home page
app.get("/", (req, res) => {
  res.render("index");
});

app.use(
  "/user",
  authMiddleware.verifyToken,
  authMiddleware.isAdmin,
  userRouter
);

app.use("/auth", authRouter);
app.use("/task", authMiddleware.verifyToken, tasksRouter);
app.use("/category", authMiddleware.verifyToken, categoryRouter);

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
