import { AnswerCategory } from "@prisma/client";
import { PlayerState } from "./playerState";
import { PromptState } from "./promptState";

export type GameSession = {
  currRound: number;
  currPlayerIndex: number;
  currPlayerId: number;
  currPhase: "prompts" | "answers" | "lobby" | "results";
  phaseTimeUp: string;
  timeout?: NodeJS.Timeout;

  categories: AnswerCategory[];
  promptsRemaining: number;
  promptState: PromptState;
  boardState: boolean[][];

  allClientStates: Map<string, PlayerState>;
  activeClientStates: Map<string, PlayerState>;
};
