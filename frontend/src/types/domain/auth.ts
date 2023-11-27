import type { IsoDateTime } from "../date-times";

export type UserRole = "user" | "admin";

export type UserDto = {
  id: number;
  email: string;
  nickname: string;
  role: UserRole;
  joined: IsoDateTime;
};

export type AuthDto = {
  token: string;
  tokenExpiration: IsoDateTime;
  user: UserDto;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type CreateAccountDto = {
  email: string;
  password: string;
  nickname: string;
};
