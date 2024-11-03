const socketIO = require("socket.io");

module.exports = (server) => {
  const io = socketIO(server);

  const users = new Map(); // Store online users

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("login", (userId) => {
      users.set(userId, socket.id);
    });

    socket.on("sendMessage", async (data) => {
      const recipientSocket = users.get(data.recipientId);
      if (recipientSocket) {
        io.to(recipientSocket).emit("newMessage", data);
      }
    });

    socket.on("disconnect", () => {
      // Remove user from online users
      for (const [userId, socketId] of users.entries()) {
        if (socketId === socket.id) {
          users.delete(userId);
          break;
        }
      }
    });
  });

  return io;
};
