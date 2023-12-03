import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { format, parseISO } from "date-fns";

import { useGetAllGamesQuery } from "~api/request/games";
import { useAuth } from "~components/auth/AuthProvider";
import { PageWrapper } from "~components/layout/PageWrapper";

export default function HistoryLandingPage() {
  const { user } = useAuth();
  const { data: allGames = [] } = useGetAllGamesQuery();

  const getDisplayDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "MMMM do, y - h:mm a");
  };

  return (
    <PageWrapper gap={1}>
      <Typography variant="h5">Past Games</Typography>
      {allGames.length === 0 ? (
        <Typography>No active games</Typography>
      ) : (
        <>
          {allGames.map((game) => (
            <Card key={game.id}>
              <CardHeader
                title={user.id === game.createdById ? "My Game" : `${game.createdBy.nickname}'s Game`}
                subheader={
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography>{getDisplayDate(game.createdAt)}</Typography>
                    <Button size="small" onClick={() => {}}>
                      Review
                    </Button>
                  </Stack>
                }
              />
            </Card>
          ))}
        </>
      )}
    </PageWrapper>
  );
}
