const express = require("express");
const path = require("path");
const app = express();
const connectDb = require("./database");
const passport = require("passport");
const morgan = require("morgan");
const cors = require("cors");
const notFoundHandler = require("./middleware/notFoundHandler");
const errorHandler = require("./middleware/errorHandler");
const userRouter = require("./api/users/user.routes");
const inventionRouter = require("./api/inventions/inventions.routes");
const orderRouter = require("./api/orders/orders.routes");
const categoryRouter = require("./api/categories/categories.routes");
const messageRoomRouter = require("./api/messageRoom/messageRoom.routes");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
require("dotenv").config();
connectDb();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

require("./middleware/passport");
app.use("/api", userRouter);
app.use("/api/inventions", inventionRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/orders", orderRouter);
app.use("/api/message-room", messageRoomRouter);
app.use("/media", express.static(path.join(__dirname, "/media")));
app.use(notFoundHandler);
app.use(errorHandler);

//socket.io
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("message", (message) => {
    console.log("socket message", message);
    io.emit("message", message);
  });
  // socket.on("disconnect", () => {
  //   console.log("A user disconnected");
  // });
});

httpServer.listen(process.env.PORT, () => {
  console.log(`The application is running on localhost:${process.env.PORT}`);
});
