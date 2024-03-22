import {
  staticDeckOfMemes,
  staticDeckOfPrompts,
} from "../../assets/staticDecks";
import { TScoreboard } from "@commonTypes/GameTypes";
import { TCardsSelectedByPlayers, TPlayerCards } from "../../types/GameTypes";
import { getRandomNumber } from "./utils";

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
  playersCards: TPlayerCards = {};
  cardsSelectedByPlayers: TCardsSelectedByPlayers = {};

  public addPlayer(username: string) {
    this.players.push(username);
    this.playersCards[username] = this.generateCardsInHandForPlayer();
    this.scoreboard[username] = 0;
  }

  public playerSelectedCard(username: string, selectedCard: string) {
    if (!this.cardsSelectedByPlayers[username])
      this.cardsSelectedByPlayers[username] = selectedCard;
  }

  public voteForPlayer(username: string) {
    this.currentScores[username]
      ? this.currentScores[username]++
      : (this.currentScores[username] = 1);
    this.numberOfVotes++;
  }

  public selectWinner() {
    if (this.numberOfVotes === NUMBER_OF_PLAYERS) {
      let playerWithMaxVotes: [string, number] = ["", 0];
      Object.entries(this.currentScores).forEach(([player, votes]) => {
        if (votes > playerWithMaxVotes[1]) {
          playerWithMaxVotes = [player, votes];
        }
      });
      this.scoreboard[playerWithMaxVotes[0]]
        ? this.scoreboard[playerWithMaxVotes[0]]++
        : (this.scoreboard[playerWithMaxVotes[0]] = 1);
    }
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
      const fileredDeckOfMems = Array.from(
        new Set([...allPlayersCards, ...cardsInHand]),
      ) as string[];
      cardsInHand.push(
        fileredDeckOfMems[getRandomNumber(fileredDeckOfMems.length)],
      );
    }
    this.removeCardFromDeck(cardsInHand);
    return cardsInHand;
  }

  private getAllPlayersCards() {
    return Object.values(this.playersCards).flat();
  }

  private removeCardFromDeck(cards: string[] | string) {
    const newDeckOfMemes = [...this.deckOfMemes];
    if (Array.isArray(cards)) {
      return newDeckOfMemes.filter((card) => !cards.includes(card));
    } else {
      return newDeckOfMemes.filter((card) => card !== cards);
    }
  }

  private roundCleanup() {
    this.currentScores = {};
    this.cardsSelectedByPlayers = {};
    this.numberOfVotes = 0;
    this.generatePrompt();
  }
}
