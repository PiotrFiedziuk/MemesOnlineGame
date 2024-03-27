import { TScoreboard } from "@commonTypes/GameTypes.ts";

export type TUseGameDataStoreTypes = TUseGameDataStorePropertiesTypes &
  TUseGameDataStoreActionsTypes;

export type TUseGameDataStorePropertiesTypes = {
  username: string;
  scoreboard: TScoreboard;
  playerHand: string[];
  playersCards: TPlayersCardsTypes;
  promptCard: string;
  selectedCards: TSelectedCardsTypes;
  gameStatus: TGameStatusTypes;
  chatMessages: string[];
  playersWhoVoted: string[];
  selectedMemePreview: string;
};

export type TUseGameDataStoreActionsTypes = {
  setUsername: (username: string) => void;
  setScoreboard: (scoreboard: TScoreboard) => void;
  setPlayerHand: (playerHand: string[]) => void;
  setPlayersCards: (playerCards: TPlayersCardsTypes) => void;
  setPromptCard: (prompt: string) => void;
  setSelectedCards: (selectedCards: TSelectedCardsTypes) => void;
  setGameStatus: (gameStatus: TGameStatusTypes) => void;
  addMessageToChat: (text: string) => void;
  setPlayersWhoVoted: (players: string[]) => void;
  setSelectedMemePreview: (uri: string) => void;
};

type TPlayersCardsTypes = { [username: string]: number };

type TSelectedCardsTypes = { isRevealed: boolean; cards: string[] };

type TGameStatusTypes = {
  displayModal: boolean;
  modalMessage: string;
};

type TMessageType = {
  timestamp: number;
  msg: string;
};
