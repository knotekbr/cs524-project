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
