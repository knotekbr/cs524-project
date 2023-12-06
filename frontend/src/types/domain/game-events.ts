import { IsoDateTime } from "../date-times";

export type GameEventType =
  | "game_created"
  | "game_started"
  | "game_paused"
  | "game_restarted"
  | "game_ended"
  | "player_joined"
  | "player_left"
  | "answer_chosen"
  | "response_chosen"
  | "scores_updated";

export type GameEventDto = {
  id: number;
  gameId: number;
  userId: number | null;
  timestamp: IsoDateTime;
  eventType: GameEventType;
  eventDetails: string | null;
  associatedPlayer: {
    user: {
      nickname: string;
    };
  } | null;
};
