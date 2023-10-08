import Stack from "@mui/material/Stack";

import { CategoryColumn } from "~components/game/CategoryColumn";
import { PageWrapper } from "~components/layout/PageWrapper";

export default function PlayGamePage() {
  return (
    <PageWrapper>
      <Stack direction="row" gap={1} bgcolor="black" p={1}>
        <CategoryColumn categoryName="Test" answersAvailable={[true, true, true, true, true]} />
        <CategoryColumn categoryName="Test" answersAvailable={[true, true, true, true, true]} />
        <CategoryColumn categoryName="Test" answersAvailable={[true, true, true, true, true]} />
        <CategoryColumn categoryName="Test" answersAvailable={[true, true, true, true, true]} />
        <CategoryColumn categoryName="Test" answersAvailable={[true, true, true, true, true]} />
        <CategoryColumn categoryName="Test" answersAvailable={[true, true, true, true, true]} />
      </Stack>
    </PageWrapper>
  );
}
