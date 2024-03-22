import { RouterProvider } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { io } from "socket.io-client";
import { router } from "./providers/Routing.tsx";
import "../index.css";

const socket = io("ws://localhost:3001", { transports: ["websocket"] });

socket.emit("TestFromFront", "Front");
socket.on("TestFromBack", (args) => console.log(args));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
