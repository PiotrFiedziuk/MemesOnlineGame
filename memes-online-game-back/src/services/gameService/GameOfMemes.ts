import {
  staticDeckOfMemes,
  staticDeckOfPrompts,
} from "../../assets/staticDecks";
import { TScoreboard } from "@commonTypes/GameTypes";
import { TCardsSelectedByPlayers, TPlayerCards } from "../../types/GameTypes";
import { getRandomNumber } from "./utils";
import { gameSocket } from "../../../main";

const PLAYER_HAND_SIZE = 4;
const NUMBER_OF_PLAYERS = 2;

export class GameOfMemes {
  currentPrompt: string = "UNDEFINED";
  numberOfVotes: number = 0;
  deckOfMemes = staticDeckOfMemes;
  deckOfPrompts = staticDeckOfPrompts;
  players: string[] = [];
  scoreboard: TScoreboard = {};
  currentScores: TScoreboard = {};
  playersThatVoted: string[] = [];
  playersCards: TPlayerCards = {};
  cardsSelectedByPlayers: TCardsSelectedByPlayers = {};
  chatLogs: { [s: string]: string }[] = [];

  public addPlayer(username: string) {
    this.players.push(username);
    this.playersCards[username] = this.generateCardsInHandForPlayer();
    this.scoreboard[username] = 0;
    const playersCardsCount = this.getPlayersCardsCount();
    this.chatLogs.push({ Server: `Player ${username} has joined!` });
    gameSocket.broadcastNewPlayer();
    gameSocket.invokeNewHandForPlayer(username, this.playersCards[username]);
    gameSocket.broadcastPlayersCardsCount(playersCardsCount);
    gameSocket.broadcastScoreboard();
    gameSocket.broadcastServerMessage(`Server: Player ${username} has joined!`);
    if (this.players.length >= NUMBER_OF_PLAYERS) this.startRound();
    else
      gameSocket.broadcastWaitingForPlayers({
        displayModal: true,
        modalMessage: `Waiting for players (${this.players.length}/${NUMBER_OF_PLAYERS})`,
      });
  }

  private startRound() {
    this.generatePrompt();
    this.chatLogs.push({ Server: "START!" });
    gameSocket.broadcastServerMessage("Server: START!");
    gameSocket.broadcastPrompt();
    gameSocket.broadcastWaitingForPlayers({
      displayModal: false,
      modalMessage: "",
    });
  }

  public playerSelectedCard(username: string, selectedCard: string) {
    if (!this.cardsSelectedByPlayers[username]) {
      this.cardsSelectedByPlayers[username] = selectedCard;
      const playersThatSelectedCard = Object.keys(this.cardsSelectedByPlayers);
      this.removeCardFromHand(username, selectedCard);
      gameSocket.broadcastSelectedCardsByPlayers(playersThatSelectedCard);
      if (
        Object.keys(this.cardsSelectedByPlayers).length === NUMBER_OF_PLAYERS
      ) {
        this.chatLogs.push({ Server: "Time to vote!" });
        gameSocket.broadcastServerMessage("Server: Time to vote!");
        gameSocket.broadcastRevealCards();
      }
    }
  }

  public voteForPlayer(playerWhoVoted: string, cardId: string) {
    if (!this.playersThatVoted.includes(playerWhoVoted)) {
      this.playersThatVoted.push(playerWhoVoted);
      const username = this.getUsernameFromCardId(cardId);
      if (username)
        this.currentScores[username]
          ? this.currentScores[username]++
          : (this.currentScores[username] = 1);
      this.numberOfVotes++;
    }

    if (this.numberOfVotes === NUMBER_OF_PLAYERS) this.selectWinner();
  }

  public selectWinner() {
    let playerWithMaxVotes: [string, number] = ["", 0];
    Object.entries(this.currentScores).forEach(([player, votes]) => {
      if (votes > playerWithMaxVotes[1]) {
        playerWithMaxVotes = [player, votes];
      }
    });
    this.scoreboard[playerWithMaxVotes[0]]
      ? this.scoreboard[playerWithMaxVotes[0]]++
      : (this.scoreboard[playerWithMaxVotes[0]] = 1);
    this.roundCleanup();
  }

  public generatePrompt() {
    const currentDeck = [...this.deckOfPrompts];
    const promptIndex = getRandomNumber(currentDeck.length);
    const newPrompt = currentDeck[promptIndex];
    this.deckOfPrompts.splice(promptIndex, 1);
    if (this.deckOfPrompts.length === 0) {
      const indexOfPromptInStatic = staticDeckOfPrompts.indexOf(newPrompt);
      this.deckOfPrompts = [...staticDeckOfPrompts].toSpliced(
        indexOfPromptInStatic,
        1,
      );
    }
    this.currentPrompt = newPrompt;
  }

  private generateCardsInHandForPlayer() {
    const cardsInHand: string[] = [];
    for (let i = 0; i < PLAYER_HAND_SIZE; i++) {
      const allPlayersCards = this.getAllPlayersCards();
      const excludedPlayerCards = Array.from(
        new Set([...allPlayersCards, ...cardsInHand]),
      ) as string[];
      const filteredDeckOfMemes = this.deckOfMemes.filter(
        (item) => !excludedPlayerCards.includes(item),
      );
      cardsInHand.push(
        filteredDeckOfMemes[getRandomNumber(filteredDeckOfMemes.length)],
      );
    }
    this.removeCardFromDeck(cardsInHand);
    return cardsInHand;
  }

  private getPlayersCardsCount() {
    return Object.keys(this.playersCards).reduce(
      (acc, curr) => {
        acc[curr] = this.playersCards[curr].length;
        return acc;
      },
      {} as { [username: string]: number },
    );
  }

  private getAllPlayersCards() {
    return Object.values(this.playersCards).flat();
  }

  private getUsernameFromCardId(cardId: string) {
    return Object.keys(this.cardsSelectedByPlayers).find(
      (key) => this.cardsSelectedByPlayers[key] === cardId,
    );
  }

  private removeCardFromDeck(cards: string[] | string) {
    const newDeckOfMemes = [...this.deckOfMemes];
    if (Array.isArray(cards)) {
      return newDeckOfMemes.filter((card) => !cards.includes(card));
    } else {
      return newDeckOfMemes.filter((card) => card !== cards);
    }
  }

  private removeCardFromHand(username: string, cardId: string) {
    const playerHand = [...this.playersCards[username]];
    this.playersCards[username] = playerHand.filter((item) => item !== cardId);
    gameSocket.broadcastNewHand(username);
  }

  private drawACardForPlayers() {
    const playersCards = { ...this.playersCards };
    Object.keys(playersCards).forEach((username) => {
      const allPlayersCards = this.getAllPlayersCards();
      const excludedPlayerCards = Array.from(
        new Set([...allPlayersCards]),
      ) as string[];
      const filteredDeckOfMemes = this.deckOfMemes.filter(
        (item) => !excludedPlayerCards.includes(item),
      );
      const randomNumber = getRandomNumber(filteredDeckOfMemes.length);
      this.playersCards[username].push(filteredDeckOfMemes[randomNumber]);
      this.removeCardFromDeck(filteredDeckOfMemes[randomNumber]);
    });
  }

  public addTextMessage(username: string, textMessage: string) {
    this.chatLogs.push({ [username]: textMessage });
    gameSocket.broadcastMessageFromPlayer(`${username}: ${textMessage}`);
  }

  private roundCleanup() {
    this.currentScores = {};
    this.cardsSelectedByPlayers = {};
    this.numberOfVotes = 0;
    this.playersThatVoted = [];
    this.generatePrompt();
    this.drawACardForPlayers();
    gameSocket.broadcastSelectedCardsByPlayers([]);
    gameSocket.broadcastScoreboard();
    gameSocket.broadcastPrompt();
    gameSocket.invokeDrawCardForPlayers();
  }
}
