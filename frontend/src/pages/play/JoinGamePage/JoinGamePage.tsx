import { useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

import {
  useAcceptInviteMutation,
  useDeclineInviteMutation,
  useLazyGetAllInvitesQuery,
} from "~api/request/game-invites";
import { useLazyGetActiveGamesQuery } from "~api/request/games";
import { useAuth } from "~components/auth/AuthProvider";
import { PageWrapper } from "~components/layout/PageWrapper";

export default function JoinGamePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [getActiveGames, { data: activeGames = [] }] = useLazyGetActiveGamesQuery();
  const [getInvites, { data: invites = [] }] = useLazyGetAllInvitesQuery();
  const [acceptInvite] = useAcceptInviteMutation();
  const [declineInvite] = useDeclineInviteMutation();

  useEffect(() => {
    getActiveGames();
    getInvites();
  }, []);

  const getDisplayDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "MMMM do, y - h:mm a");
  };

  const handleAcceptInvite = (id: number) => {
    acceptInvite({ urlParams: { id } })
      .unwrap()
      .then(() => {
        getActiveGames();
        getInvites();
      })
      .catch();
  };

  const handleDeclineInvite = (id: number) => {
    declineInvite({ urlParams: { id } })
      .unwrap()
      .then(() => {
        getInvites();
      })
      .catch();
  };

  return (
    <PageWrapper nested pt={2} gap={2}>
      <Stack gap={1}>
        <Typography variant="h5">Active Games</Typography>
        {activeGames.length === 0 ? (
          <Typography>No active games</Typography>
        ) : (
          <>
            {activeGames.map((game) => (
              <Card key={game.id}>
                <CardHeader
                  title={user.id === game.createdById ? "My Game" : `${game.createdBy.nickname}'s Game`}
                  subheader={
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography>{getDisplayDate(game.createdAt)}</Typography>
                      <Button size="small" onClick={() => navigate(`/play/${game.id}`)}>
                        Play
                      </Button>
                    </Stack>
                  }
                />
              </Card>
            ))}
          </>
        )}
      </Stack>
      <Stack gap={1}>
        <Typography variant="h5">Game Invites</Typography>
        {invites.length === 0 ? (
          <Typography>No game invites</Typography>
        ) : (
          <>
            {invites.map((invite) => (
              <Card key={invite.gameId}>
                <CardHeader
                  title={`${invite.game.createdBy.nickname}'s Game`}
                  subheader={
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography>{getDisplayDate(invite.createdAt)}</Typography>
                      <Box>
                        <Button size="small" color="success" onClick={() => handleAcceptInvite(invite.gameId)}>
                          Accept
                        </Button>
                        <Button size="small" color="error" onClick={() => handleDeclineInvite(invite.gameId)}>
                          Decline
                        </Button>
                      </Box>
                    </Stack>
                  }
                />
              </Card>
            ))}
          </>
        )}
      </Stack>
    </PageWrapper>
  );
}
