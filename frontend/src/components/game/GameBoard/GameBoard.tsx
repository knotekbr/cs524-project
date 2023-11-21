import Stack from "@mui/material/Stack";

import { GameBoardProps } from "./GameBoard.types";
import { CategoryColumn } from "../CategoryColumn";

export default function GameBoard({ categories, gameBoardRef }: GameBoardProps) {
  return (
    <Stack direction="row" flex={5} gap={1} ref={gameBoardRef}>
      {categories.map((category) => (
        <CategoryColumn {...category} key={category.categoryName} />
      ))}
    </Stack>
  );
}
