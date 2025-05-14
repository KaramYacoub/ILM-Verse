const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "./config.env") });
//-----------------------------------------------------------
const app = require("./app.js");
const port = process.env.BACKEND_PORT;
//-----------------------------------------------------------
// Create HTTP Server for WebSocket support
const http = require("http");
const server = http.createServer(app);

// PG SQL Connection
const sequelize = require("./models/Connections/SQL-Driver");
sequelize.authenticate().then(() => {
  console.log("SQL Connection has been established successfully.");
});
// Mongo (NOSQL) Connection
const mongoose = require("mongoose");
mongoose
  .connect(process.env.NOSQLURL)
  .then(() => {
    console.log("NoSQL connection Completed");
  })
  .catch((err) => {
    console.log(err);
  });

// Set up Socket.IO
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Adjust to your frontend domain
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("🟢 New WebSocket connection:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on("sendMessage", ({ roomId, message }) => {
    io.to(roomId).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

// Start the server (HTTP + WebSocket)
server.listen(port, () => {
  console.log(`🚀 Server + WebSocket running at http://localhost:${port}`);
});

// When Shutting Down The Server
process.on("SIGINT", () => {
  sequelize.close();
  console.log("🔌 SQL DB connection closed.");
  mongoose.disconnect();
  console.log("🔌 NOSQL DB connection closed.");
  process.exit(0);
});
