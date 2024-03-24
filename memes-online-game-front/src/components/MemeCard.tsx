import { gameSocket } from "../api/websockets/gameSocket.ts";
import { useGameDataStore } from "../stores/useGameDataStore.ts";

interface IMemeCard {
  uri: string;
}

export const MemeCard = ({ uri }: IMemeCard) => {
  const isWaitingForPlayers = useGameDataStore(
    (state) => state.isWaitingForPlayers,
  );
  const handleClick = () => {
    !isWaitingForPlayers && gameSocket.invokeSelectCard(uri);
  };

  return (
    <div
      className="h-36 w-56 bg-blue-400 rounded-md border-2 border-black hover:drop-shadow-xl hover:scale-105 cursor-pointer"
      onClick={handleClick}
    >
      {uri}
    </div>
  );
};
