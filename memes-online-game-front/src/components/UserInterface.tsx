import { Chat } from "./Chat.tsx";
import { Hand } from "./Hand.tsx";
import { Scoreboard } from "./Scoreboard.tsx";

export const UserInterface = () => {
  return (
    <div className="w-full h-1/4 flex justify-between">
      <Chat />
      <Hand />
      <Scoreboard />
    </div>
  );
};
