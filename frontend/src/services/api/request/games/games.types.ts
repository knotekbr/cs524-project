import { GameDto } from "~app/types/domain/games";

import { ApiResponse } from "~types";

export type ManyGamesResponse = ApiResponse<GameDto[]>;
export type OneGameResponse = ApiResponse<GameDto>;
