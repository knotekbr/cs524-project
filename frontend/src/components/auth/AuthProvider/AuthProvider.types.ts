import type { UserDto, UserRole } from "~types";

export type AuthCtxValue = {
  isLoggedIn: boolean;
  user: UserDto;
  hasRole: (...roles: UserRole[]) => boolean;
  logOut: () => void;
};

export type AuthProviderProps = {
  children?: React.ReactNode;
};
