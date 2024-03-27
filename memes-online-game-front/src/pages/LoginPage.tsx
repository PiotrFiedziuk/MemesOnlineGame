import { useState } from "react";
import { Button } from "../components/Button.tsx";
import { Input } from "../components/Input.tsx";
import { gameSocket } from "../api/websockets/gameSocket.ts";
import { useGameDataStore } from "../stores/useGameDataStore.ts";

export const LoginPage = () => {
  const [username, setUsername] = useState(
    localStorage.getItem("username") ?? "",
  );

  const handleSetUsername = (value: string) => {
    localStorage.setItem("username", value);
    setUsername(value);
  };

  const handleClick = () => {
    gameSocket.joinGame(username);
    useGameDataStore.getState().setUsername(username);
  };

  return (
    <div className="w-full h-full relative flex justify-center py-72">
      <span className="text-5xl h-fit">Memes Game</span>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-3 ">
        <Input
          value={username}
          onChange={(value) => handleSetUsername(value)}
        />
        <Button onClick={handleClick}>
          <span>Dołącz do gry</span>
        </Button>
      </div>
    </div>
  );
};
