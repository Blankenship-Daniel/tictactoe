export const drawBorder = (row: number, col: number) => {
  const styles: Record<string, string> = {};
  if (row > 0) {
    styles["borderTop"] = "1px solid black";
  }
  if (col > 0) {
    styles["borderLeft"] = "1px solid black";
  }
  return styles;
};
