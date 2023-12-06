import { useEffect, useMemo, useRef, useState } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { useParams } from "react-router-dom";

import { useGetGameplayStateQuery } from "~api/request/games";
import { SocketSingleton } from "~app/services/SocketSingleton";
import { useAuth } from "~components/auth/AuthProvider";
import { GameBoard } from "~components/game/GameBoard";
import { PregameLobby } from "~components/game/PregameLobby";
import { TimeRemaining } from "~components/game/TimeRemaining";
import { PageWrapper } from "~components/layout/PageWrapper";
import { useAppSelector } from "~hooks/state";

import type { InvitePlayerDto, LeaveGameDto, SelectPromptDto, SelectResponseDto } from "~types";

const PlayerRow = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  color: theme.palette.secondary.main,
}));

const MultipleChoiceAnswer = styled(Stack)(({ theme }) => ({
  width: "75%",
  height: "33%",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  fontSize: 24,
  backgroundColor: theme.palette.primary.main,
  "& *": {
    fontSize: "inherit",
  },
  userSelect: "none",
}));

export default function PlayGamePage() {
  const { user } = useAuth();
  const token = useAppSelector((state) => state.auth.token);

  const { gameId: gameIdStr } = useParams();
  const gameId = useMemo(() => parseInt(gameIdStr || "0", 10) || 0, [gameIdStr]);
  const { data: gameplayState, isLoading: gameplayStateLoading } = useGetGameplayStateQuery({
    urlParams: { id: gameId },
  });

  const [responseChosen, setResponseChosen] = useState(-1);

  const gameBoardRef = useRef<HTMLDivElement | null>(null);
  const [gameBoardHeight, setGameBoardHeight] = useState<number | undefined>();

  const ws = useMemo(() => SocketSingleton.instance(token), []);

  const { currPhase } = gameplayState || { currPhase: "lobby" };

  const leaveGame = (message: LeaveGameDto) => {
    ws.emit("leave_game", message);
  };

  const invitePlayer = (message: InvitePlayerDto) => {
    ws.emit("invite_player", message);
  };

  const startGame = () => {
    ws.emit("start_game");
  };

  const selectPrompt = (message: SelectPromptDto) => {
    ws.emit("select_prompt", message);
  };

  const selectResponse = (message: SelectResponseDto) => {
    if (responseChosen === -1) {
      setResponseChosen(message.responseIndex);
      ws.emit("select_response", message);
    }
  };

  useEffect(() => {
    if (gameplayStateLoading) {
      return () => {};
    }

    return () => {
      leaveGame({ gameId });
    };
  }, [gameplayStateLoading]);

  useEffect(() => {
    if (currPhase !== "prompts" || gameBoardHeight !== undefined || !gameBoardRef.current) {
      return;
    }

    const boardElemHeight = gameBoardRef.current.getBoundingClientRect().height;
    setGameBoardHeight(boardElemHeight);
  }, [currPhase]);

  if (!gameplayState) {
    return (
      <PageWrapper alignItems="center">
        <Typography variant="h4">Loading...</Typography>
      </PageWrapper>
    );
  }

  if (currPhase === "lobby") {
    const { createdById } = gameplayState;

    return (
      <PageWrapper>
        <Stack direction="row" gap={1.5} p={1}>
          <PregameLobby
            players={gameplayState.players}
            onInvite={invitePlayer}
            onStartGame={startGame}
            gameCreatorId={createdById}
          />
        </Stack>
      </PageWrapper>
    );
  }

  if (currPhase === "prompts") {
    const { boardState, categories, players, currPlayerId, phaseTimeUp, currRound } = gameplayState;
    const currPlayerNickname = players.find((player) => player.id === currPlayerId)?.nickname || "Unknown";
    const isCurrPlayer = currPlayerId === user.id;

    if (responseChosen !== -1) {
      setResponseChosen(-1);
    }

    return (
      <PageWrapper>
        <Stack direction="row" gap={1.5} p={1} bgcolor="black">
          <GameBoard
            categories={categories}
            boardState={boardState}
            onClickPrompt={(message) => {
              if (isCurrPlayer) {
                selectPrompt({ ...message, roundNumber: currRound });
              }
            }}
            gameBoardRef={gameBoardRef}
          />
          <Stack flex={1} textAlign="center" gap={1}>
            <Stack flex={1} bgcolor="primary.main" p={1}>
              <Typography variant="categoryName">Players</Typography>
              {players.map((player) => (
                <PlayerRow key={player.id}>
                  <Typography>{player.nickname}</Typography>
                  <Typography>{`$${player.score}`}</Typography>
                </PlayerRow>
              ))}
            </Stack>
            <Stack bgcolor="primary.main" p={1}>
              <Typography variant="categoryName">{`${currPlayerNickname}'s Turn`}</Typography>
            </Stack>
            <Stack bgcolor="primary.main" p={1}>
              <Typography variant="categoryName">Time Remaining</Typography>
              <TimeRemaining timeUpDateString={phaseTimeUp} />
            </Stack>
          </Stack>
        </Stack>
      </PageWrapper>
    );
  }

  if (currPhase === "answers") {
    const {
      prompt: { category, prompt, responses, value },
      phaseTimeUp,
      currRound,
    } = gameplayState;

    return (
      <PageWrapper>
        <Stack direction="row" gap={1.5} p={1} bgcolor="black">
          <Stack flex={1} gap={1} textAlign="center" height={gameBoardHeight}>
            <Stack direction="row" gap={1}>
              <Stack flex={1} bgcolor="primary.main" justifyContent="center" p={1}>
                <Typography variant="categoryName" fontSize={24}>
                  {category}
                </Typography>
              </Stack>
              <Stack flex={1} bgcolor="primary.main" justifyContent="center" p={1}>
                <Typography variant="categoryAnswer">{`$${value}`}</Typography>
              </Stack>
            </Stack>
            <Stack bgcolor="primary.main" justifyContent="center" p={1}>
              <Typography variant="categoryName" fontSize={24}>
                {prompt}
              </Typography>
            </Stack>
            <Stack direction="row" flex={1}>
              <Stack flex={1.5} alignItems="center" justifyContent="space-evenly">
                <MultipleChoiceAnswer
                  onClick={() => selectResponse({ responseIndex: 0, roundNumber: currRound })}
                  style={{
                    cursor: responseChosen === -1 ? "pointer" : undefined,
                    opacity: responseChosen !== -1 && responseChosen !== 0 ? 0.5 : undefined,
                  }}
                >
                  <Typography variant="categoryName">{responses[0]}</Typography>
                </MultipleChoiceAnswer>
                <MultipleChoiceAnswer
                  onClick={() => selectResponse({ responseIndex: 1, roundNumber: currRound })}
                  style={{
                    cursor: responseChosen === -1 ? "pointer" : undefined,
                    opacity: responseChosen !== -1 && responseChosen !== 1 ? 0.5 : undefined,
                  }}
                >
                  <Typography variant="categoryName">{responses[1]}</Typography>
                </MultipleChoiceAnswer>
              </Stack>
              <Stack flex={1.5} alignItems="center" justifyContent="space-evenly">
                <MultipleChoiceAnswer
                  onClick={() => selectResponse({ responseIndex: 2, roundNumber: currRound })}
                  style={{
                    cursor: responseChosen === -1 ? "pointer" : undefined,
                    opacity: responseChosen !== -1 && responseChosen !== 2 ? 0.5 : undefined,
                  }}
                >
                  <Typography variant="categoryName">{responses[2]}</Typography>
                </MultipleChoiceAnswer>
                <MultipleChoiceAnswer
                  onClick={() => selectResponse({ responseIndex: 3, roundNumber: currRound })}
                  style={{
                    cursor: responseChosen === -1 ? "pointer" : undefined,
                    opacity: responseChosen !== -1 && responseChosen !== 3 ? 0.5 : undefined,
                  }}
                >
                  <Typography variant="categoryName">{responses[3]}</Typography>
                </MultipleChoiceAnswer>
              </Stack>
              <Stack flex={1} gap={2}>
                <Stack flex={1} justifyContent="center" alignItems="center" textAlign="center" bgcolor="primary.main">
                  <Typography variant="categoryName">Time Remaining</Typography>
                  <TimeRemaining timeUpDateString={phaseTimeUp} />
                </Stack>
                <Stack
                  flex={1}
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  bgcolor="primary.main"
                  onClick={() => selectResponse({ responseIndex: 4, roundNumber: currRound })}
                  style={{
                    cursor: responseChosen === -1 ? "pointer" : undefined,
                    opacity: responseChosen !== -1 && responseChosen !== 4 ? 0.5 : undefined,
                  }}
                >
                  <Typography variant="categoryName">I don&apos;t know</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </PageWrapper>
    );
  }

  if (currPhase === "results") {
    const { players } = gameplayState;
    const sortedPlayers = [...players].sort((a, b) => a.score - b.score);

    return (
      <PageWrapper>
        <Stack gap={1.5} p={1}>
          <Typography variant="h4" textAlign="center">
            Game Over!
          </Typography>
          <Typography variant="h6">Final Scores:</Typography>
          <ul>
            {sortedPlayers.map((player) => (
              <li key={player.id}>
                {player.nickname} - {`$${player.score}`}
              </li>
            ))}
          </ul>
        </Stack>
      </PageWrapper>
    );
  }

  return null;
}
