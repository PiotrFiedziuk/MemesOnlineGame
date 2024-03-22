//ON - Z

//INVOKE DO

import {Server} from "socket.io";

class GameSocket {
    private connection;
    constructor() {
        this.connection = new Server()

        this.connection.
    }

    private initializeEvents(){
        this.connection.on('connection',this.onConnection);
    }

  private onConnection(socket){
        //t
  };

  private onPlayerConnect;

  private onPlayerDisconnect;

  private invokeGameStarted;

  private invokeScoreboardChange;

  private invokeGiveNewCards;
}
