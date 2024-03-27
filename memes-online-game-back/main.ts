import { GameOfMemes } from "./src/services/gameService/GameOfMemes";
import { GameSocket } from "./src/api/websocket/GameSocket";
import express from "express";

export const gameSocket = new GameSocket();
export let currentGame = new GameOfMemes();

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(JSON.stringify(currentGame, null, 2));
});

app.get("/reset", (req, res) => {
  gameSocket.broadcastResetGame();
  currentGame = new GameOfMemes();
  res.send("Game Resetted.");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
