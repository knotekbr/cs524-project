import { ApiResponse, GameInviteDto, GameInviteSummaryDto } from "~types";

export type ManyGameInvitesResponse = ApiResponse<GameInviteDto[]>;
export type GameInviteSummaryResponse = ApiResponse<GameInviteSummaryDto>;
