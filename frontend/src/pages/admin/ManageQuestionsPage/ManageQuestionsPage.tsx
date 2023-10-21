import FilterIcon from "@mui/icons-material/FilterAlt";
import UploadIcon from "@mui/icons-material/Upload";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { PageWrapper } from "~components/layout/PageWrapper";

export default function ManageQuestionsPage() {
  return (
    <PageWrapper nested pt={1} gap={1}>
      <Stack direction="row" gap={1} ml="auto">
        <IconButton>
          <UploadIcon />
        </IconButton>
        <IconButton>
          <FilterIcon />
        </IconButton>
      </Stack>
      <Card>
        <CardHeader
          title="This data type stores ordered lists of characters."
          subheader={
            <Stack direction="row" justifyContent="space-between">
              <Typography>What is a string?</Typography>
              <Typography>Category: Data Types</Typography>
            </Stack>
          }
        />
      </Card>
      <Card>
        <CardHeader
          title="This data type stores ordered lists of characters."
          subheader={
            <Stack direction="row" justifyContent="space-between">
              <Typography>What is a string?</Typography>
              <Typography>Category: Data Types</Typography>
            </Stack>
          }
        />
      </Card>
      <Card>
        <CardHeader
          title="This data type stores ordered lists of characters."
          subheader={
            <Stack direction="row" justifyContent="space-between">
              <Typography>What is a string?</Typography>
              <Typography>Category: Data Types</Typography>
            </Stack>
          }
        />
      </Card>
      <Card>
        <CardHeader
          title="This data type stores ordered lists of characters."
          subheader={
            <Stack direction="row" justifyContent="space-between">
              <Typography>What is a string?</Typography>
              <Typography>Category: Data Types</Typography>
            </Stack>
          }
        />
      </Card>
    </PageWrapper>
  );
}
