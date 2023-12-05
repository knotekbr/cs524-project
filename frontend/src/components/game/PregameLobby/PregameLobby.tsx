import { useState } from "react";

import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAuth } from "~components/auth/AuthProvider";
import { ControlledTextField } from "~components/forms/ControlledTextField";

import { PregameLobbyProps } from "./PregameLobby.types";
import { inviteSchema, inviteSchemaDefaults } from "./inviteSchema";

import { InvitePlayerDto } from "~types";

export default function PregameLobby({ onInvite, onStartGame, players, gameCreatorId }: PregameLobbyProps) {
  const { user } = useAuth();
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(inviteSchema),
    mode: "onChange",
    defaultValues: inviteSchemaDefaults(),
  });

  const onSubmit: SubmitHandler<InvitePlayerDto> = (data) => {
    const { email } = data;
    onInvite(data);

    if (email !== user.email && !invitedEmails.includes(email)) {
      setInvitedEmails((curr) => [...curr, email]);
    }
  };

  return (
    <>
      <Stack flex={3} gap={1}>
        {gameCreatorId === user.id ? (
          <>
            <Stack direction="row" alignItems="center" gap={1}>
              <ControlledTextField control={control} name="email" label="Invite Email" />
              <Button onClick={handleSubmit(onSubmit)}>Invite</Button>
            </Stack>
            <Button onClick={onStartGame}>Start Game</Button>
            <Divider />
          </>
        ) : (
          <Typography variant="h6" textAlign="center" fontStyle="italic">
            Waiting for host to start game...
          </Typography>
        )}
        <Typography textAlign="center" variant="h6">
          Players in Lobby
        </Typography>
        <ul>
          {players.map((player) => (
            <li key={player.id}>{player.nickname}</li>
          ))}
        </ul>
      </Stack>
      {gameCreatorId === user.id && (
        <>
          <Divider orientation="vertical" flexItem />
          <Stack flex={1}>
            <Typography textAlign="center" variant="h6">
              Invited Emails
            </Typography>
            {invitedEmails.length === 0 ? (
              <Typography textAlign="center" fontStyle="italic">
                None
              </Typography>
            ) : (
              <ul>
                {invitedEmails.map((email) => (
                  <li key={email}>{email}</li>
                ))}
              </ul>
            )}
          </Stack>
        </>
      )}
    </>
  );
}
