import express from "express";
import { Server } from "socket.io";

const app = express();
const port = 3000;
const portWs = 3001;
const ioServer = new Server(portWs, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
  transports: ["websocket"],
});

const users: { username: string; points: number }[] = [];

ioServer.on("connect", (socket) => {
  socket.on("login", (args) => {
    const usernames = users.map((item) => item.username);
    if (!usernames.includes(args)) users.push({ username: args, points: 0 });
  });
  socket.emit("loginRespond", "ok");
});

ioServer.on("connection", (socket) => {
  socket.emit("room", users);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
