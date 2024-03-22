import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { io } from "socket.io-client";
import { Button } from "../components/Button.tsx";
import { Input } from "../components/Input.tsx";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    const socket = io("http://localhost:3001", { transports: ["websocket"] });
    socket.emit("login", username);
    socket.on("loginRespond", (args) => {
      if (args === "ok") {
        navigate({ to: "/room" });
      }
    });
  };

  return (
    <div className="w-full h-full relative flex justify-center py-72">
      <span className="text-5xl h-fit">Memes Game</span>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-3 ">
        <Input value={username} onChange={(value) => setUsername(value)} />
        <Button onClick={handleClick}>
          <span>Dołącz do gry</span>
        </Button>
      </div>
    </div>
  );
};
