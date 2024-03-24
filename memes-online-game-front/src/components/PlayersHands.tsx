import { useGameDataStore } from "../stores/useGameDataStore.ts";
import { PlayerHand } from "./PlayerHand.tsx";

export const PlayersHands = () => {
  const playerCards = useGameDataStore((state) => state.playersCards);

  return (
    <div className="w-full h-1/6 flex gap-2">
      {Object.keys(playerCards).map((username) => (
        <PlayerHand
          key={username}
          username={username}
          cardsCount={playerCards[username]}
        />
      ))}
    </div>
  );
};
