import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { format, parseISO } from "date-fns";

import { useGetGameEventsQuery } from "~api/request/game-events";
import { useAuth } from "~components/auth/AuthProvider";

import { GameEventsDialogProps } from "./GameEventsDialog.types";

import { GameEventType, PlayerState } from "~types";

const eventTypeMap: Record<GameEventType, string> = {
  answer_chosen: "Prompt Chosen",
  game_created: "Game Created",
  game_ended: "Game Ended",
  game_paused: "Game Paused",
  game_restarted: "Game Unpaused",
  game_started: "Game Started",
  player_joined: "Player Joined",
  player_left: "Player Left",
  response_chosen: "Response Chosen",
  scores_updated: "Final Scores",
};

export default function GameEventsDialog({ game, onClose, open }: GameEventsDialogProps) {
  const { user } = useAuth();

  const { data: gameEvents = [] } = useGetGameEventsQuery({ urlParams: { id: game.id } });

  const getDisplayDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "MMMM do, y - h:mm a");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth scroll="paper">
      <DialogTitle>Review {user.id === game.createdById ? "My Game" : `${game.createdBy.nickname}'s Game`}</DialogTitle>
      <DialogContent>
        <ol>
          {gameEvents.map(({ associatedPlayer, eventDetails, eventType, timestamp }) => (
            <li key={`${eventType}${timestamp}`} style={{ marginBottom: "10px" }}>
              {eventTypeMap[eventType]} ({getDisplayDate(timestamp)})
              {eventType !== "scores_updated" ? (
                <ul>
                  {associatedPlayer && <li>Player: {associatedPlayer.user.nickname}</li>}
                  {eventDetails && <li>Details: {eventDetails}</li>}
                </ul>
              ) : (
                <ul>
                  {(JSON.parse(eventDetails!) as PlayerState[]).map((player) => (
                    <li key={`${player.id}_final-score`}>
                      {player.nickname} - ${player.score}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
        {/* <Stack gap={1}>
          {gameEvents.map(({ associatedPlayer, eventDetails, eventType, timestamp }) => (
            <Card key={`${eventType}${timestamp}`}>
              <CardHeader
                title={eventTypeMap[eventType]}
                subheader={
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography>{associatedPlayer?.user.nickname || ""}</Typography>
                    <Typography>{getDisplayDate(timestamp)}</Typography>
                  </Stack>
                }
              />
              {eventDetails && (
                <CardContent>
                  <Typography>{eventDetails}</Typography>
                </CardContent>
              )}
            </Card>
          ))}
        </Stack> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
