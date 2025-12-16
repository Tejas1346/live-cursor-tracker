import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

export const app = express();
app.use(express.json());
export const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin:["http://localhost:5173"]
    }
});

io.on("connection", (socket) => {
    console.log("connected",socket.id);

    
});

