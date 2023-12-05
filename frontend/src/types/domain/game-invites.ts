import { GameDto } from "./games";
import { IsoDateTime } from "../date-times";

export type GameInviteDto = {
  gameId: number;
  invitedEmail: string;
  createdAt: IsoDateTime;
  game: GameDto & {
    createdBy: {
      nickname: string;
    };
  };
};

export type GameInviteSummaryDto = {
  gameId: number;
  invitedEmail: string;
  createdAt: IsoDateTime;
};
