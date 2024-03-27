import { gameSocket } from "../api/websockets/gameSocket.ts";
import { useState } from "react";
import { MemePreview } from "./MemePreview.tsx";
import { useGameDataStore } from "../stores/useGameDataStore.ts";

interface ICardOnTable {
  isRevealed: boolean;
  isCardSelected?: boolean;
  uri: string;
  onClickCallback: (uri: string) => void;
}

export const CardOnTable = ({
  isRevealed,
  uri,
  onClickCallback,
  isCardSelected,
}: ICardOnTable) => {
  const handleClick = () => {
    if (isRevealed) {
      gameSocket.invokeVoteForPlayer(uri);
      onClickCallback(uri);
    }
  };

  const handleEnter = () => {
    useGameDataStore.getState().setSelectedMemePreview(uri);
  };
  const handleLeave = () => {
    useGameDataStore.getState().setSelectedMemePreview("");
  };

  return (
    <div
      onMouseEnter={() => isRevealed && handleEnter()}
      onMouseLeave={() => handleLeave()}
      className={`w-1/4 h-2/3 border-2 border-black rounded-md  ${isCardSelected ? "bg-emerald-950" : "bg-emerald-600"}`}
      onClick={handleClick}
    >
      {isRevealed && uri}
    </div>
  );
};
