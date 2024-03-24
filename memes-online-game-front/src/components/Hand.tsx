import { useGameDataStore } from "../stores/useGameDataStore.ts";
import { MemeCard } from "./MemeCard.tsx";

export const Hand = () => {
  const playerHand = useGameDataStore((state) => state.playerHand);

  return (
    <div className="flex justify-center items-center gap-2">
      {playerHand.map((card) => (
        <MemeCard key={card} uri={card} />
      ))}
    </div>
  );
};
