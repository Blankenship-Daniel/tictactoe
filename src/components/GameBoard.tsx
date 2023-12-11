import { useState } from "react";
import { board } from "../utils/board";
import { boardMap } from "../utils/board.map";
import { Cell } from "./Cell";
import { Player } from "../utils/player";
import { computeKey } from "../utils/key";
import { Game } from "../utils/game";
import { Cat } from "./Cat";

const styles = {
  game: {
    display: "flex",
    "flex-direction": "column",
  },
  board: {
    display: "grid",
    gridTemplateColumns: `repeat(${board.length}, 256px)`,
  },
  playAgainBtn: {
    fontSize: "32px",
    padding: "32px",
    margin: "32px",
    border: "none",
    cursor: "pointer",
  },
};

export const GameBoard = () => {
  const [gameBoard, setGameBoard] = useState(boardMap);
  const [player, setPlayer] = useState(Player.One);
  const [isCatGame, setIsCatGame] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const onPlayAgain = () => {
    setGameBoard(boardMap);
    setPlayer(Player.One);
    setIsCatGame(false);
    setIsGameOver(false);
    Game.reset(board);
  };

  const onCellClick = (rowIndex: number, colIndex: number) => {
    if (isGameOver) {
      return;
    }

    const key = computeKey(rowIndex, colIndex);

    // If the cell is already occupied, do nothing.
    if (gameBoard[key].player !== Player.None) {
      return;
    }

    // First update the gameBoard with the new move.
    const gameBoardWithNewMove = {
      ...gameBoard,
      [key]: {
        key,
        rowIndex,
        colIndex,
        player,
        isWinningCell: false,
      },
    };

    // Then check to see if the new move is a winning move.
    // If it is, update the gameBoard with the winning cells.
    const game = Game.getInstance(board);
    const winningGameBoard = game.computeWin(
      rowIndex,
      colIndex,
      player,
      gameBoardWithNewMove
    );

    const updatedGameBoard = winningGameBoard || gameBoardWithNewMove;

    // Check to see if the game is a cat game, or in other words, a tie.
    const isCatGame = game.checkForCatGame(updatedGameBoard);
    setIsCatGame(isCatGame);

    setGameBoard(updatedGameBoard);
    setPlayer(player === Player.One ? Player.Two : Player.One);

    // If the game is over, or the game is a tie, set the game over state.
    // Don't allow any more moves.
    if (winningGameBoard || isCatGame) {
      setIsGameOver(true);
    }
  };

  return (
    <div style={styles.game}>
      {isCatGame ? (
        <Cat />
      ) : (
        <div style={styles.board}>
          {Object.values(gameBoard).map((coord) => {
            return (
              <div key={coord.key}>
                <Cell
                  rowIndex={coord.rowIndex}
                  colIndex={coord.colIndex}
                  player={coord.player}
                  isWinningCell={coord.isWinningCell}
                  onClick={onCellClick}
                />
              </div>
            );
          })}
        </div>
      )}
      {isGameOver && (
        <button onClick={onPlayAgain} style={styles.playAgainBtn}>
          Play Again?
        </button>
      )}
    </div>
  );
};
