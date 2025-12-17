import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

export const app = express();
app.use(express.json());
export const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("connection", (socket) => {
  const userId = socket.id;
  console.log("connected", userId);

  socket.broadcast.emit("user-joined", {
    userId: userId,
  });

  socket.on("mouse-move", ({ x, y }) => {
    socket.broadcast.emit("cursor-update", {userId, x, y });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-left", { userId: userId });
  });
});
