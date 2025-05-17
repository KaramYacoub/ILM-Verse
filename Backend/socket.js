const { Server } = require("socket.io");
const http = require("http");
const app = require("./app");
const { disconnect } = require("process");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// used to store online users:
const userSocketMap = {};

io.on("connection", () => (socket) => {
  console.log("User connected", socket.id);

  io.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});
module.exports = { io, server };
