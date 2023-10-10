import FilterIcon from "@mui/icons-material/FilterAlt";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { PageWrapper } from "~components/layout/PageWrapper";

export default function ManageGamesPage() {
  return (
    <PageWrapper nested pt={1} gap={1}>
      <Stack direction="row" gap={1} ml="auto">
        <IconButton>
          <FilterIcon />
        </IconButton>
      </Stack>
      <Card>
        <CardHeader
          title="bk11's Game"
          subheader={
            <Stack direction="row" justifyContent="space-between">
              <Typography>ID: 185</Typography>
              <Typography>October 10, 2023, 7:49 PM</Typography>
            </Stack>
          }
        />
      </Card>
      <Card>
        <CardHeader
          title="bk11's Game"
          subheader={
            <Stack direction="row" justifyContent="space-between">
              <Typography>ID: 185</Typography>
              <Typography>October 10, 2023, 7:49 PM</Typography>
            </Stack>
          }
        />
      </Card>
      <Card>
        <CardHeader
          title="bk11's Game"
          subheader={
            <Stack direction="row" justifyContent="space-between">
              <Typography>ID: 185</Typography>
              <Typography>October 10, 2023, 7:49 PM</Typography>
            </Stack>
          }
        />
      </Card>
      <Card>
        <CardHeader
          title="bk11's Game"
          subheader={
            <Stack direction="row" justifyContent="space-between">
              <Typography>ID: 185</Typography>
              <Typography>October 10, 2023, 7:49 PM</Typography>
            </Stack>
          }
        />
      </Card>
    </PageWrapper>
  );
}
