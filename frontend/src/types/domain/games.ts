import { IsoDateTime } from "../date-times";

export type GameStatus = "created" | "in_progress" | "paused" | "ended";

export type GameDto = {
  id: number;
  createdById: number;
  createdBy: {
    nickname: string;
  };
  status: GameStatus;
  createdAt: IsoDateTime;
};

export type PlayerState = {
  id: number;
  nickname: string;
  score: number;
};

export type PromptState = {
  category: string;
  prompt: string;
  value: number;
  responses: string[];
};

export type CategorySummary = {
  id: number;
  categoryName: string;
};

export type GameplayState = GameDto & {
  boardState: boolean[][];
  categories: CategorySummary[];
  currPhase: "prompts" | "answers" | "lobby" | "results";
  currPlayerId: number;
  currRound: number;
  phaseTimeUp: IsoDateTime;
  players: PlayerState[];
  prompt: PromptState;
};

export type GameStateDto = Pick<
  GameplayState,
  "boardState" | "categories" | "currPhase" | "currPlayerId" | "currRound" | "phaseTimeUp"
>;

export type PlayerStateDto = Pick<GameplayState, "players">;

export type PromptStateDto = Pick<GameplayState, "phaseTimeUp" | "prompt">;

export type InvitePlayerDto = {
  email: string;
};

export type JoinGameDto = {
  gameId: number;
};

export type LeaveGameDto = {
  gameId: number;
};

export type SelectPromptDto = {
  roundNumber: number;
  categoryIndex: number;
  promptIndex: number;
};

export type SelectResponseDto = {
  roundNumber: number;
  responseIndex: number;
};

export type GameEndedDto = GameStateDto &
  PlayerStateDto & {
    status: "ended";
  };
