import type { StackProps } from "@mui/material";

import type { GameplayState, SelectPromptDto } from "~types";

export type GameBoardProps = {
  categories: GameplayState["categories"];
  boardState: GameplayState["boardState"];
  gameBoardRef: StackProps["ref"];
  onClickPrompt: (message: Omit<SelectPromptDto, "roundNumber">) => void;
};
