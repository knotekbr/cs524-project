import { useEffect, useRef, useState } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

import { io } from "socket.io-client";

import { GameBoard } from "~components/game/GameBoard";
import { PageWrapper } from "~components/layout/PageWrapper";
import { useAppSelector } from "~hooks/state";

import type { GameState } from "~types";

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
}));

const gameState: GameState = {
  categories: [
    { categoryName: "Famous Names", answersAvailable: [true, true, true, true, true] },
    { categoryName: "Data Types", answersAvailable: [true, true, true, true, true] },
    { categoryName: "Web Frameworks", answersAvailable: [true, true, true, true, true] },
    { categoryName: "Bits & Bytes", answersAvailable: [true, true, true, true, true] },
    { categoryName: "Programming Languages", answersAvailable: [true, true, true, true, true] },
    { categoryName: "Databases", answersAvailable: [true, true, true, true, true] },
  ],
  players: [
    { id: 1, nickname: "Brandon", score: 200 },
    { id: 2, nickname: "Jacob", score: 200 },
    { id: 3, nickname: "Ragi", score: 200 },
    { id: 4, nickname: "Remi", score: 200 },
    { id: 5, nickname: "Vasuki", score: 200 },
  ],
  currentPlayerId: 1,
  currentPlayerNickname: "Remi",
};

export default function PlayGamePage() {
  const token = useAppSelector((state) => state.auth.token);
  const gameBoardRef = useRef<HTMLDivElement | null>(null);
  const [gameBoardHeight, setGameBoardHeight] = useState(300);
  // Placeholder to easily switch between game board and multiple choice input
  const [answerMode, setAnswerMode] = useState(false);

  useEffect(() => {
    if (!gameBoardRef.current) {
      return () => {};
    }

    const ws = io("ws://localhost:3000", { path: "/play", extraHeaders: { authorization: token } });
    ws.on("message", (msg) => console.log(msg));

    const boardElemHeight = gameBoardRef.current.getBoundingClientRect().height;
    setGameBoardHeight(boardElemHeight);

    return () => {
      ws.disconnect();
    };
  }, []);

  return (
    <PageWrapper>
      <Stack direction="row" gap={1.5} p={1} bgcolor="black">
        {answerMode === false ? (
          <>
            <GameBoard categories={gameState.categories} gameBoardRef={gameBoardRef} />
            {/* Everything below is placeholder to generate "mocks" */}
            <Stack flex={1} textAlign="center" gap={1}>
              <Stack flex={1} bgcolor="primary.main" p={1} onClick={() => setAnswerMode(!answerMode)}>
                <Typography variant="categoryName">Players</Typography>
                {gameState.players.map((player) => (
                  <PlayerRow key={player.id}>
                    <Typography>{player.nickname}</Typography>
                    <Typography>{`$${player.score}`}</Typography>
                  </PlayerRow>
                ))}
              </Stack>
              <Stack bgcolor="primary.main" p={1}>
                <Typography variant="categoryName">Remi&apos;s turn</Typography>
              </Stack>
              <Stack bgcolor="primary.main" p={1}>
                <Typography variant="categoryName">Time Remaining</Typography>
                <Typography color="secondary.main" fontSize={18}>
                  00:15
                </Typography>
              </Stack>
            </Stack>
          </>
        ) : (
          <Stack
            flex={1}
            gap={1}
            textAlign="center"
            height={gameBoardHeight}
            onClick={() => setAnswerMode(!answerMode)}
          >
            <Stack direction="row" gap={1}>
              <Stack flex={1} bgcolor="primary.main" justifyContent="center" p={1}>
                <Typography variant="categoryName" fontSize={24}>
                  Data Types
                </Typography>
              </Stack>
              <Stack flex={1} bgcolor="primary.main" justifyContent="center" p={1}>
                <Typography variant="categoryAnswer">$200</Typography>
              </Stack>
            </Stack>
            <Stack bgcolor="primary.main" justifyContent="center" p={1}>
              <Typography variant="categoryName" fontSize={24}>
                This data type stores ordered lists of characters.
              </Typography>
            </Stack>
            <Stack direction="row" flex={1}>
              <Stack flex={1.5} alignItems="center" justifyContent="space-evenly">
                <MultipleChoiceAnswer>
                  <Typography variant="categoryName">Integer</Typography>
                </MultipleChoiceAnswer>
                <MultipleChoiceAnswer>
                  <Typography variant="categoryName">String</Typography>
                </MultipleChoiceAnswer>
              </Stack>
              <Stack flex={1.5} alignItems="center" justifyContent="space-evenly">
                <MultipleChoiceAnswer>
                  <Typography variant="categoryName">Float</Typography>
                </MultipleChoiceAnswer>
                <MultipleChoiceAnswer>
                  <Typography variant="categoryName">Array</Typography>
                </MultipleChoiceAnswer>
              </Stack>
              <Stack flex={1} gap={2}>
                <Stack flex={1} justifyContent="center" alignItems="center" textAlign="center" bgcolor="primary.main">
                  <Typography variant="categoryName">Time Remaining</Typography>
                  <Typography color="secondary.main" fontSize={18}>
                    00:15
                  </Typography>
                </Stack>
                <Stack flex={1} justifyContent="center" alignItems="center" textAlign="center" bgcolor="primary.main">
                  <Typography variant="categoryName">I don&apos;t know</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>
    </PageWrapper>
  );
}
