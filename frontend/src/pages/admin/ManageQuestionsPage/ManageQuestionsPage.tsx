import { useState } from "react";

import FilterIcon from "@mui/icons-material/FilterAlt";
import UploadIcon from "@mui/icons-material/Upload";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useGetAllPromptsQuery } from "~api/request/answer-prompts";
import { CsvUploadDialog } from "~components/CsvUploadDialog";
import { PageWrapper } from "~components/layout/PageWrapper";

export default function ManageQuestionsPage() {
  const { data: allPrompts = [] } = useGetAllPromptsQuery();
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <PageWrapper nested pt={1} gap={1}>
      <Stack direction="row" gap={1} ml="auto">
        <IconButton onClick={openDialog}>
          <UploadIcon />
        </IconButton>
        <IconButton>
          <FilterIcon />
        </IconButton>
      </Stack>
      {allPrompts.map((prompt) => (
        <Card key={prompt.id}>
          <CardHeader
            title={prompt.prompt}
            subheader={
              <Stack direction="row" justifyContent="space-between">
                <Typography>{prompt.correctResponse}</Typography>
                <Typography>Category: {prompt.category.categoryName}</Typography>
              </Stack>
            }
          />
        </Card>
      ))}
      <CsvUploadDialog open={dialogOpen} onClose={closeDialog} />
    </PageWrapper>
  );
}
