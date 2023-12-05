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

import type { InvitePlayerDto, JoinGameDto, LeaveGameDto, SelectPromptDto, SelectResponseDto } from "~types";

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
  const { gameId: gameIdStr } = useParams();
  const [joinedGame, setJoinedGame] = useState(false);
  const [responseChosen, setResponseChosen] = useState(-1);
  const gameId = useMemo(() => parseInt(gameIdStr || "0", 10) || 0, [gameIdStr]);

  const { data: gameplayState, isLoading: gameplayStateLoading } = useGetGameplayStateQuery({
    urlParams: { id: gameId },
  });
  const token = useAppSelector((state) => state.auth.token);

  const gameBoardRef = useRef<HTMLDivElement | null>(null);
  const [gameBoardHeight, setGameBoardHeight] = useState(300);
  // Placeholder to easily switch between game board and multiple choice input
  const [answerMode, setAnswerMode] = useState(false);

  const ws = useMemo(() => SocketSingleton.socket(token), []);

  const joinGame = (message: JoinGameDto) => {
    ws.emit("join_game", message);
  };

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
    if (gameplayStateLoading || !ws.connected || joinedGame) {
      return;
    }

    if (!joinedGame) {
      joinGame({ gameId });
      setJoinedGame(true);
    }
  }, [gameplayStateLoading, ws.connected]);

  useEffect(() => {
    if (!gameBoardRef.current) {
      return;
    }

    const boardElemHeight = gameBoardRef.current.getBoundingClientRect().height;
    setGameBoardHeight(boardElemHeight);
  }, []);

  if (!gameplayState) {
    return (
      <PageWrapper alignItems="center">
        <Typography variant="h4">Loading...</Typography>
      </PageWrapper>
    );
  }

  const { currPhase } = gameplayState;
  console.log(`Curr Phase: ${currPhase}`);

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

    setResponseChosen(-1);

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
            <Stack flex={1} bgcolor="primary.main" p={1} onClick={() => setAnswerMode(!answerMode)}>
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
                <Stack flex={1} justifyContent="center" alignItems="center" textAlign="center" bgcolor="primary.main">
                  <Typography variant="categoryName">I don&apos;t know</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </PageWrapper>
    );
  }

  return null;
}
