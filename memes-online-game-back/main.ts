import { GameOfMemes } from "./src/services/gameService/GameOfMemes";
import { GameSocket } from "./src/api/websocket/GameSocket";

export const gameSocket = new GameSocket();
export const currentGame = new GameOfMemes();
