const express = require("express");
const path = require("path");
const app = express();
const connectDb = require("./database");
const passport = require("passport");
const morgan = require("morgan");
const cors = require("cors");
const notFoundHandler = require("./middleware/notFoundHandler");
const errorHandler = require("./middleware/errorHandler");
const inventionRouter = require("./api/inventions/inventions.router");
const orderRouter = require("./api/orders/orders.routes");
const categoryRouter = require("./api/categories/categories.router");
const userRouter = require("./api/users/user.router");

const {localStrategy, jwtStrategy} = require("./middleware/passport");

require("dotenv").config();
connectDb();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use("/api", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/inventions", inventionRouter);
app.use("/api/categories", categoryRouter);
app.use("/media", express.static(path.join(__dirname, "/media")));
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`The application is running on localhost:${process.env.PORT}`);
});
