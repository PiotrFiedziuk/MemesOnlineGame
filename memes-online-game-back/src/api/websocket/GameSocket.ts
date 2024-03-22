import { Server, Socket } from "socket.io";
import { currentGame } from "../../../main";

export class GameSocket {
  private connections: any = {};
  private socketConnection;
  constructor() {
    this.socketConnection = new Server(3001, { cors: { origin: "http" } });
    this.initializeEvents();
  }

  private initializeEvents() {
    this.socketConnection.on("connection", this.onConnection);
  }

  private initializeConnectionForUser(socket: Socket) {
    socket.on("JOIN_GAME", (username: string) => {
      this.connections[username] = socket;
      currentGame.addPlayer(username);
      this.initializeEventsForUser(username, socket);
    });
  }

  private initializeEventsForUser(username: string, socket: Socket) {
    socket.on("SELECT_CARD", (cardId: string) => {
      currentGame.playerSelectedCard(username, cardId);
    });
    socket.on("VOTE_FOR_PLAYER", (votedPlayer: string) => {
      currentGame.voteForPlayer(votedPlayer);
    });
  }

  public invokeNewHandForPlayer(username: string, cards: string[]) {
    this.connections[username]?.invoke("NEW_CARDS", cards);
  }

  private onConnection(socket: Socket) {
    this.initializeConnectionForUser(socket);
  }
}
