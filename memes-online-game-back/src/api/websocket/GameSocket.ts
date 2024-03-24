import { Server, Socket } from "socket.io";
import { currentGame, gameSocket } from "../../../main";

export class GameSocket {
  private connections: { [username: string]: Socket } = {};
  private socketConnection;
  constructor() {
    this.socketConnection = new Server(3001, { cors: { origin: "http" } });
    this.initializeEvents();
  }

  private initializeEvents() {
    this.socketConnection.on("connection", (socket) =>
      this.onConnection(socket),
    );
  }

  private initializeConnectionForUser(socket: Socket) {
    socket.on("JOIN_GAME", (username: string) => {
      this.connections[username] = socket;
      currentGame.addPlayer(username);
      this.initializeEventsForUser(username, socket);
      this.invokeEventsForUser(socket);
    });
  }

  private invokeEventsForUser(socket: Socket) {
    socket.emit("SCOREBOARD_LIST", currentGame.scoreboard);
  }

  public invokeNewHandForPlayer(username: string, cards: string[]) {
    this.connections[username].emit("NEW_CARDS", cards);
  }

  public invokeDrawCardForPlayers() {
    Object.keys(this.connections).forEach((username) =>
      this.connections[username].emit(
        "NEW_CARDS",
        currentGame.playersCards[username],
      ),
    );
  }

  public broadcastNewPlayer() {
    this.socketConnection.send("PLAYER_LISTS", currentGame.players);
  }

  public broadcastScoreboard() {
    this.socketConnection.emit("SCOREBOARD_LIST", currentGame.scoreboard);
  }

  public broadcastPlayersCardsCount(playersCardsCount: {
    [username: string]: number;
  }) {
    this.socketConnection.emit("PLAYERS_CARDS", playersCardsCount);
  }

  public broadcastPrompt() {
    this.socketConnection.emit("PROMPT", currentGame.currentPrompt);
  }

  public broadcastSelectedCardsByPlayers(playersThatSelectedCard: string[]) {
    this.socketConnection.emit("SELECTED_CARDS", {
      isRevealed: false,
      cards: playersThatSelectedCard,
    });
  }

  public broadcastWaitingForPlayers(gameStatus: {
    displayModal: boolean;
    modalMessage: string;
  }) {
    this.socketConnection.emit("GAME_STATUS", gameStatus);
  }

  public broadcastRevealCards() {
    this.socketConnection.emit("REVEAL_CARDS", {
      isRevealed: true,
      cards: Object.values(currentGame.cardsSelectedByPlayers),
    });
  }

  public broadcastNewHand(username: string) {
    this.connections[username].emit(
      "NEW_CARDS",
      currentGame.playersCards[username],
    );
  }

  public broadcastServerMessage(text: string) {
    this.socketConnection.emit("CHAT_SERVER_MESSAGE", text);
  }

  public broadcastMessageFromPlayer(textMessage: string) {
    this.socketConnection.emit("PLAYER_MESSAGE", textMessage);
  }

  private initializeEventsForUser(username: string, socket: Socket) {
    socket.on("SELECT_CARD", (cardId: string) => {
      currentGame.playerSelectedCard(username, cardId);
    });
    socket.on("VOTE_FOR_PLAYER", (votedCard: string) => {
      currentGame.voteForPlayer(username, votedCard);
    });
    socket.on("CHAT_MESSAGE", (textMessage) => {
      currentGame.addTextMessage(username, textMessage);
    });
  }

  private onConnection(socket: Socket) {
    this.initializeConnectionForUser(socket);
  }
}
