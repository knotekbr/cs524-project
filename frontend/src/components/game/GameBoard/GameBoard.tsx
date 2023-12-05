import Stack from "@mui/material/Stack";

import { GameBoardProps } from "./GameBoard.types";
import { CategoryColumn } from "../CategoryColumn";

export default function GameBoard({ categories, boardState, gameBoardRef, onClickPrompt }: GameBoardProps) {
  return (
    <Stack direction="row" flex={5} gap={1} ref={gameBoardRef}>
      {categories.map((category, idx) => (
        <CategoryColumn
          categoryName={category.categoryName}
          answersAvailable={boardState[idx] as any}
          key={category.categoryName}
          onClickPrompt={(promptIndex) => onClickPrompt({ promptIndex, categoryIndex: idx })}
        />
      ))}
    </Stack>
  );
}
