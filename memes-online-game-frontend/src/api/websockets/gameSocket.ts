import { Socket } from "./socket.ts";

class GameSocket extends Socket {
  constructor(uri: string) {
    super(uri);
    this.initializeEvents();
  }

  private initializeEvents() {
    this.socketConnection.on("join_game", this.onJoinGame);
  }

  private onJoinGame() {}

  public selectCard(id: string) {}
}
