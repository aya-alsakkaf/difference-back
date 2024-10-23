const express = require("express");
const path = require("path");
const app = express();
const connectDb = require("./database");
const passport = require("passport");
const morgan = require("morgan");
const cors = require("cors");
const notFoundHandler = require("./middleware/notFoundHandler");
const errorHandler = require("./middleware/errorHandler");
const userRouter = require("./api/users/user.router");
const inventionRouter = require("./api/inventions/inventions.router");
const categoryRouter = require("./api/categories/categories.router");
require("dotenv").config();
connectDb();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use(passport.initialize());
require("./middleware/passport"); // this will instantly initiate the functions inside passport.js

app.use("/api", userRouter);
app.use("/api", inventionRouter);
app.use("/api", categoryRouter);
// use if u want to see images in browser-> localhost:PORT/media/...imgUrl
app.use("/media", express.static(path.join(__dirname, "/media")));

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`The application is running on localhost:${process.env.PORT}`);
});
