import { Socket as SocketIO, io } from "socket.io-client";
export abstract class Socket {
  public uri: string;
  public socketConnection: SocketIO;
  constructor(uri: string) {
    this.uri = uri;
    this.socketConnection = io(uri, { transports: ["websocket"] });
  }
}
