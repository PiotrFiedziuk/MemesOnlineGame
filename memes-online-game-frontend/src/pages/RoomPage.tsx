import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { ScoreBoard } from "../components/ScoreBoard.tsx";

export const RoomPage = () => {
  const [users, setUsers] = useState<{ username: string; points: number }[]>(
    [],
  );
  const socket = io("http://localhost:3001", { transports: ["websocket"] });

  useEffect(() => {
    socket.on("room", (args) => setUsers(args));
  }, [users]);

  return (
    <div className="bg-white w-full h-full">
      <ScoreBoard users={users} />
    </div>
  );
};
