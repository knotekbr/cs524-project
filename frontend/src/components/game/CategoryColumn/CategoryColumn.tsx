import Stack from "@mui/material/Stack";

import { CategoryColumnProps } from "./CategoryColumn.types";
import { CategoryItem } from "../CategoryItem";

export default function CategoryColumn({ answersAvailable, categoryName }: CategoryColumnProps) {
  return (
    <Stack gap={1} flex={1}>
      <CategoryItem itemType="title" label={categoryName} />
      {answersAvailable.map((available, index) => {
        const dollarAmount = `$${(index + 1) * 200}`;
        return (
          <CategoryItem
            itemType="answer"
            label={dollarAmount}
            available={available}
            onClick={() => {}}
            key={`${categoryName}-${dollarAmount}`}
          />
        );
      })}
    </Stack>
  );
}
