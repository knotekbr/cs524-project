import { useEffect, useRef, useState } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { CategoryColumn } from "~components/game/CategoryColumn";
import { PageWrapper } from "~components/layout/PageWrapper";

export default function PlayGamePage() {
  const gameBoardRef = useRef<HTMLDivElement | null>(null);
  const [gameBoardHeight, setGameBoardHeight] = useState(300);
  // Placeholder to easily switch between game board and multiple choice input
  const [answerMode, setAnswerMode] = useState(false);

  useEffect(() => {
    if (!gameBoardRef.current) {
      return;
    }

    const boardElemHeight = gameBoardRef.current.getBoundingClientRect().height;
    setGameBoardHeight(boardElemHeight);
  }, []);

  return (
    <PageWrapper>
      <Stack direction="row" gap={1.5} p={1} bgcolor="black">
        {answerMode === false ? (
          <>
            <Stack direction="row" flex={5} gap={1} ref={gameBoardRef}>
              <CategoryColumn categoryName="Famous Names" answersAvailable={[true, true, true, true, true]} />
              <CategoryColumn categoryName="Data Types" answersAvailable={[true, true, true, true, true]} />
              <CategoryColumn categoryName="Web Frameworks" answersAvailable={[true, true, true, true, true]} />
              <CategoryColumn categoryName="Bits & Bytes" answersAvailable={[true, true, true, true, true]} />
              <CategoryColumn categoryName="Programming Languages" answersAvailable={[true, true, true, true, true]} />
              <CategoryColumn categoryName="Databases" answersAvailable={[true, true, true, true, true]} />
            </Stack>
            {/* Everything below is placeholder to generate "mocks" */}
            <Stack flex={1} textAlign="center" gap={1}>
              <Stack flex={1} bgcolor="primary.main" p={1} onClick={() => setAnswerMode(!answerMode)}>
                <Typography variant="categoryName">Players</Typography>
                <Stack direction="row" justifyContent="space-between" color="secondary.main">
                  <Typography>Brandon</Typography>
                  <Typography>$200</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" color="secondary.main">
                  <Typography>Jacob</Typography>
                  <Typography>$200</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" color="secondary.main">
                  <Typography>Ragi</Typography>
                  <Typography>$200</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" color="secondary.main">
                  <Typography>Remi</Typography>
                  <Typography>$200</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" color="secondary.main">
                  <Typography>Vasuki</Typography>
                  <Typography>$200</Typography>
                </Stack>
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
                <Stack
                  width={0.75}
                  height={0.25 * gameBoardHeight}
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  bgcolor="primary.main"
                >
                  <Typography variant="categoryName" fontSize={24}>
                    Integer
                  </Typography>
                </Stack>
                <Stack
                  width={0.75}
                  height={0.25 * gameBoardHeight}
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  bgcolor="primary.main"
                >
                  <Typography variant="categoryName" fontSize={24}>
                    String
                  </Typography>
                </Stack>
              </Stack>
              <Stack flex={1.5} alignItems="center" justifyContent="space-evenly">
                <Stack
                  width={0.75}
                  height={0.25 * gameBoardHeight}
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  bgcolor="primary.main"
                >
                  <Typography variant="categoryName" fontSize={24}>
                    Float
                  </Typography>
                </Stack>
                <Stack
                  width={0.75}
                  height={0.25 * gameBoardHeight}
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  bgcolor="primary.main"
                >
                  <Typography variant="categoryName" fontSize={24}>
                    Array
                  </Typography>
                </Stack>
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
            {/* <Stack flex={1} justifyContent="space-evenly">
              <Stack direction="row" justifyContent="space-evenly">
                <Stack
                  width={0.25}
                  height={0.25 * gameBoardHeight}
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  bgcolor="primary.main"
                >
                  <Typography variant="categoryName">Integer</Typography>
                </Stack>
                <Stack
                  width={0.25}
                  height={0.25 * gameBoardHeight}
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  bgcolor="primary.main"
                >
                  <Typography variant="categoryName">String</Typography>
                </Stack>
                <Stack
                  width={0.25}
                  height={0.25 * gameBoardHeight}
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  bgcolor="primary.main"
                >
                  <Typography variant="categoryName">Time Remaining</Typography>
                  <Typography color="secondary.main">00:15</Typography>
                </Stack>
              </Stack>
              <Stack direction="row" justifyContent="space-evenly">
                <Stack
                  width={0.25}
                  height={0.25 * gameBoardHeight}
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  bgcolor="primary.main"
                >
                  <Typography variant="categoryName">Float</Typography>
                </Stack>
                <Stack
                  width={0.25}
                  height={0.25 * gameBoardHeight}
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  bgcolor="primary.main"
                >
                  <Typography variant="categoryName">Array</Typography>
                </Stack>
                <Stack
                  width={0.25}
                  height={0.25 * gameBoardHeight}
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  bgcolor="primary.main"
                >
                  <Typography variant="categoryName">I don&apos;t know</Typography>
                </Stack>
              </Stack>
            </Stack> */}
          </Stack>
        )}
      </Stack>
    </PageWrapper>
  );
}
