import { Server } from "socket.io";
import { AuthApi } from "./src/api/authorization/AuthApi";

const portWs = 3001;
const ioServer = new Server(portWs, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
  transports: ["websocket"],
});

const users: { username: string; points: number }[] = [];

export const authApi = new AuthApi();

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
