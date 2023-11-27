import type { IsoDateTime, UserDto } from "~types";

export type AuthSliceState = {
  token: string;
  tokenExpiration: IsoDateTime;
  user: UserDto | null;
};
