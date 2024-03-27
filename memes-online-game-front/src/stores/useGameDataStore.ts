import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { TUseGameDataStoreTypes } from "../types/useGameDataStoreTypes.ts";

export const useGameDataStore = create<TUseGameDataStoreTypes>()(
  immer((set) => ({
    username: "",
    scoreboard: {},
    playerHand: [],
    playersCards: {},
    playersWhoVoted: [],
    promptCard: "",
    selectedMemePreview: "",
    selectedCards: { isRevealed: false, cards: [] },
    gameStatus: {
      displayModal: false,
      modalMessage: "",
    },
    chatMessages: [],
    setUsername: (username) => {
      set((state) => {
        state.username = username;
      });
    },
    setScoreboard: (scoreboard) => {
      set((state) => {
        state.scoreboard = scoreboard;
      });
    },
    setPlayerHand: (playerHand) => {
      set((state) => {
        state.playerHand = playerHand;
      });
    },
    setPlayersCards: (playerCards) => {
      set((state) => {
        state.playersCards = Object.keys(playerCards).reduce(
          (acc, curr) => {
            if (curr !== state.username) {
              acc[curr] = playerCards[curr];
            }
            return acc;
          },
          {} as { [username: string]: number },
        );
      });
    },
    setSelectedMemePreview: (uri) => {
      set((state) => {
        state.selectedMemePreview = uri;
      });
    },
    setPromptCard: (prompt) => {
      set((state) => {
        state.promptCard = prompt;
      });
    },
    setSelectedCards: (selectedCards) => {
      set((state) => {
        state.selectedCards = selectedCards;
      });
    },
    setGameStatus: (gameStatus) => {
      set((state) => {
        state.gameStatus = gameStatus;
      });
    },
    setPlayersWhoVoted: (players) => {
      set((state) => {
        state.playersWhoVoted = players;
      });
    },
    addMessageToChat: (text) => {
      set((state) => {
        console.log("adding chat msg", text);
        state.chatMessages.push(text);
      });
    },
  })),
);
