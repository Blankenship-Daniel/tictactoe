import { Board } from "./board";
import { computeKey } from "./key";

export class PlayerMove {
  private row: string[][];
  private col: string[][];
  private diag: string[];
  private antiDiag: string[];
  private boardSize: number;

  constructor(board: Board) {
    this.row = Array(board.length).fill([]);
    this.col = Array(board.length).fill([]);
    this.diag = [];
    this.antiDiag = [];
    this.boardSize = board.length;
  }

  computeMove(rowIndex: number, colIndex: number) {
    const key = computeKey(rowIndex, colIndex);
    const r = this.row[rowIndex];
    this.row[rowIndex] = [...r, key];
    const c = this.col[colIndex];
    this.col[colIndex] = [...c, key];

    if (rowIndex === colIndex) {
      this.diag.push(key);
    }

    if (rowIndex + colIndex === this.boardSize - 1) {
      this.antiDiag.push(key);
    }

    if (this.row[rowIndex].length === this.boardSize) {
      return this.row[rowIndex];
    }

    if (this.col[colIndex].length === this.boardSize) {
      return this.col[colIndex];
    }

    if (this.diag.length === this.boardSize) {
      return this.diag;
    }

    if (this.antiDiag.length === this.boardSize) {
      return this.antiDiag;
    }

    return null;
  }
}
