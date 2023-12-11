import { drawBorder } from "../utils/drawborder";
import { Player } from "../utils/player";

const styles = {
  cell(row: number, col: number, isWinning: boolean) {
    return {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "256px",
      height: "256px",
      fontSize: "256px",
      backgroundColor: isWinning ? "green" : "white",
      ...drawBorder(row, col),
    };
  },
};

type Props = {
  isWinningCell: boolean;
  rowIndex: number;
  colIndex: number;
  player: Player;
  onClick: (rowIndex: number, colIndex: number) => void;
};

export const Cell = ({
  isWinningCell,
  rowIndex,
  colIndex,
  player,
  onClick,
}: Props) => {
  return (
    <div
      style={styles.cell(rowIndex, colIndex, isWinningCell)}
      onClick={() => {
        onClick(rowIndex, colIndex);
      }}
    >
      {player === Player.One && "X"}
      {player === Player.Two && "O"}
    </div>
  );
};
