import { Player } from "./player";
import { Board, board } from "./board";
import { computeKey } from "./key";

export type BoardMap = {
  [key: string]: {
    key: string;
    player: Player;
    rowIndex: number;
    colIndex: number;
    isWinningCell: boolean;
  };
};

export const getBoardMap = (board: Board): BoardMap => {
  const map: BoardMap = {};
  board.forEach((row: Player[], rowIndex: number) => {
    row.forEach((player: Player, colIndex: number) => {
      const key = computeKey(rowIndex, colIndex);
      map[key] = { player, rowIndex, colIndex, key, isWinningCell: false };
    });
  });
  return map;
};

export const boardMap = getBoardMap(board);
