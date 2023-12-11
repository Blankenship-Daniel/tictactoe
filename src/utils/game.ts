import { Board } from "./board";
import { BoardMap } from "./board.map";
import { Player } from "./player";
import { PlayerMove } from "./playermove";

export class Game {
  static instance: Game;

  private playerOne: PlayerMove;
  private playerTwo: PlayerMove;

  private constructor(board: Board) {
    this.playerOne = new PlayerMove(board);
    this.playerTwo = new PlayerMove(board);
  }

  static getInstance(board: Board) {
    if (!Game.instance) {
      Game.instance = new Game(board);
    }
    return Game.instance;
  }

  static reset(board: Board) {
    Game.instance = new Game(board);
  }

  private getWinningPath(rowIndex: number, colIndex: number, player: Player) {
    switch (player) {
      case Player.One:
        return this.playerOne.computeMove(rowIndex, colIndex);
      case Player.Two:
        return this.playerTwo.computeMove(rowIndex, colIndex);
      default:
        return null;
    }
  }

  checkForCatGame(board: BoardMap) {
    return Object.values(board).every(
      (cell) => cell.player !== Player.None && !cell.isWinningCell
    );
  }

  computeWin(
    rowIndex: number,
    colIndex: number,
    player: Player,
    coords: BoardMap
  ): BoardMap | null {
    const path = this.getWinningPath(rowIndex, colIndex, player);

    // If no path, return the original coords
    if (!path) {
      return null;
    }

    const newCoords = { ...coords };
    path?.forEach((key: string) => {
      newCoords[key].isWinningCell = true;
    });
    return newCoords;
  }
}
