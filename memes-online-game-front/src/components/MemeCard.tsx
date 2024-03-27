import { gameSocket } from "../api/websockets/gameSocket.ts";
import { useGameDataStore } from "../stores/useGameDataStore.ts";
interface IMemeCard {
  uri: string;
}

export const MemeCard = ({ uri }: IMemeCard) => {
  const handleClick = () => {
    gameSocket.invokeSelectCard(uri);
  };

  const handleEnter = () => {
    useGameDataStore.getState().setSelectedMemePreview(uri);
  };
  const handleLeave = () => {
    useGameDataStore.getState().setSelectedMemePreview("");
  };
  return (
    <>
      <div
        onMouseEnter={() => handleEnter()}
        onMouseLeave={() => handleLeave()}
        className="h-36 w-56 bg-blue-400 rounded-md border-2 border-black hover:drop-shadow-xl cursor-pointer"
        onClick={handleClick}
      >
        {uri}
      </div>
    </>
  );
};
