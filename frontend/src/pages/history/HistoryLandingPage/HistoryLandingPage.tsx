import { useState } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { format, parseISO } from "date-fns";

import { useGetAllGamesQuery } from "~api/request/games";
import { GameEventsDialog } from "~components/GameEventsDialog";
import { useAuth } from "~components/auth/AuthProvider";
import { PageWrapper } from "~components/layout/PageWrapper";

import { GameDto } from "~types";

export default function HistoryLandingPage() {
  const { user } = useAuth();
  const { data: allGames = [] } = useGetAllGamesQuery();
  const [selectedGame, setSelectedGame] = useState<GameDto>();
  const [dialogOpen, setDialogOpen] = useState(false);

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleReviewGame = (game: GameDto) => {
    setSelectedGame(game);
    setDialogOpen(true);
  };

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
                    <Button size="small" onClick={() => handleReviewGame(game)}>
                      Review
                    </Button>
                  </Stack>
                }
              />
            </Card>
          ))}
        </>
      )}
      {selectedGame && (
        <GameEventsDialog game={selectedGame} open={dialogOpen} onClose={closeDialog} key={selectedGame.id} />
      )}
    </PageWrapper>
  );
}
