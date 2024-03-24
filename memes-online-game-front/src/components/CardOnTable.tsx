import { gameSocket } from "../api/websockets/gameSocket.ts";

interface ICardOnTable {
  isRevealed: boolean;
  uri: string;
}

export const CardOnTable = ({ isRevealed, uri }: ICardOnTable) => {
  const handleClick = () => {
    isRevealed && gameSocket.invokeVoteForPlayer(uri);
  };

  return (
    <div
      className="w-1/4 h-2/3 border-2 border-black rounded-md bg-emerald-600"
      onClick={handleClick}
    >
      {isRevealed && uri}
    </div>
  );
};
