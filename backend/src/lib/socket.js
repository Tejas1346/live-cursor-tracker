import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { getColor } from "./colors.js";

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
  const userCount = io.engine.clientsCount;
  console.log("connected", userId);

  socket.on("set-user", ({ username }) => {
    console.log(userCount);
    const color = getColor(userCount);
    socket.username=username;
    socket.color=color
    socket.broadcast.emit("user-joined", {
      userId: userId,
      username:username,
      color:color
    });
  });

  socket.on("mouse-move", ({ x, y }) => {
    const username = socket.username;
    const color = socket.color
    socket.broadcast.emit("cursor-update", { userId, x, y,username,color });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-left", { userId: userId });
  });
});
