import { useGameDataStore } from "../../stores/useGameDataStore.ts";
import { Socket } from "./socket.ts";

class GameSocket extends Socket {
  constructor(uri: string) {
    super(uri);
    this.initializeEvents();
  }

  private initializeEvents() {
    this.onBroadcastWaitingForPlayers();
    this.onBroadcastScoreboard();
    this.onNewHandForPlayer();
    this.onBroadcastPlayerCards();
    this.onBroadcastPrompt();
    this.onBroadcastSelectedCards();
    this.onBroadcastRevealCards();
    this.onBroadcastServerMessage();
    this.onBroadcastPlayerMessage();
  }

  public joinGame(username: string) {
    this.socketConnection.emit("JOIN_GAME", username);
    this.initializeEvents();
  }

  private onBroadcastScoreboard() {
    this.socketConnection.on("SCOREBOARD_LIST", (args) => {
      useGameDataStore.getState().setScoreboard(args);
    });
  }

  private onBroadcastPlayerCards() {
    this.socketConnection.on("PLAYERS_CARDS", (args) => {
      console.log(args);
      useGameDataStore.getState().setPlayersCards(args);
    });
  }

  private onNewHandForPlayer() {
    this.socketConnection.on("NEW_CARDS", (args) => {
      useGameDataStore.getState().setPlayerHand(args);
    });
  }

  private onBroadcastPrompt() {
    this.socketConnection.on("PROMPT", (args) =>
      useGameDataStore.getState().setPromptCard(args),
    );
  }

  private onBroadcastSelectedCards() {
    this.socketConnection.on("SELECTED_CARDS", (args) =>
      useGameDataStore.getState().setSelectedCards(args),
    );
  }

  private onBroadcastWaitingForPlayers() {
    this.socketConnection.on("GAME_STATUS", (args) => {
      useGameDataStore.getState().setGameStatus(args);
    });
  }

  private onBroadcastRevealCards() {
    this.socketConnection.on("REVEAL_CARDS", (args) => {
      useGameDataStore.getState().setSelectedCards(args);
    });
  }

  private onBroadcastServerMessage() {
    this.socketConnection.on("CHAT_SERVER_MESSAGE", (args) =>
      useGameDataStore.getState().addMessageToChat(args),
    );
  }

  private onBroadcastPlayerMessage() {
    this.socketConnection.on("PLAYER_MESSAGE", (args) =>
      useGameDataStore.getState().addMessageToChat(args),
    );
  }

  public invokeSelectCard(cardId: string) {
    this.socketConnection.emit("SELECT_CARD", cardId);
  }

  public invokeVoteForPlayer(cardId: string) {
    this.socketConnection.emit("VOTE_FOR_PLAYER", cardId);
  }

  public invokeChatMessage(textMessage: string) {
    this.socketConnection.emit("CHAT_MESSAGE", textMessage);
  }
}

export const gameSocket = new GameSocket("http://localhost:3001");
