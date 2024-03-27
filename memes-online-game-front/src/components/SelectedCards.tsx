import { useEffect, useState } from "react";
import { useGameDataStore } from "../stores/useGameDataStore.ts";
import { CardOnTable } from "./CardOnTable.tsx";

export const SelectedCards = () => {
  const selectedCards = useGameDataStore((state) => state.selectedCards);

  const [selectedCardUri, setSelectedCardUri] = useState<undefined | string>(
    undefined,
  );
  const [isVoted, setIsVoted] = useState(false);

  useEffect(() => {
    setIsVoted(false);
    setSelectedCardUri(undefined);
    useGameDataStore.getState().setSelectedMemePreview("");
  }, [JSON.stringify(selectedCards)]);

  const onClickCallback = (uri: string) => {
    setIsVoted(true);
    !isVoted && setSelectedCardUri(uri);
  };

  return (
    <div className=" w-3/4 h-full flex items-center gap-2">
      {selectedCards.cards.map((value, index) => (
        <CardOnTable
          onClickCallback={onClickCallback}
          key={index}
          isCardSelected={value === selectedCardUri}
          isRevealed={selectedCards.isRevealed}
          uri={value}
        />
      ))}
    </div>
  );
};
