import { useGameDataStore } from "../stores/useGameDataStore.ts";
import { CardOnTable } from "./CardOnTable.tsx";

export const SelectedCards = () => {
  const selectedCards = useGameDataStore((state) => state.selectedCards);

  return (
    <div className=" w-3/4 h-full flex items-center gap-2">
      {selectedCards.cards.map((value, index) => (
        <CardOnTable
          key={index}
          isRevealed={selectedCards.isRevealed}
          uri={value}
        />
      ))}
    </div>
  );
};
