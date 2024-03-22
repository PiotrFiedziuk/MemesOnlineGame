import { Socket } from "./socket.ts";

class GameSocket extends Socket {
  constructor(uri: string) {
    super(uri);
    this.initializeEvents();
  }

  private initializeEvents() {}

  public joinGame(username: string) {
    this.socketConnection.emit("JOIN_GAME", username);
  }
}

export const gameSocket = new GameSocket("http://localhost:3001");
