import type { StackProps } from "@mui/material";

import type { GameCategory } from "~types";

export type GameBoardProps = {
  categories: GameCategory[];
  gameBoardRef: StackProps["ref"];
};
