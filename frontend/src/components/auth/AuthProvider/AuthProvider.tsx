import { createContext, useContext, useMemo } from "react";

import isBefore from "date-fns/isBefore";

import { useAppDispatch, useAppSelector } from "~hooks/state";
import { resetAuthSlice } from "~state/slices/authSlice";

import type { UserDto } from "~types";

import type { AuthCtxValue, AuthProviderProps } from "./AuthProvider.types";

const defaultUser: UserDto = {
  id: -1,
  nickname: "User",
  email: "email@test.com",
  role: "user",
  joined: new Date().toISOString() as any,
};

const AuthCtx = createContext<AuthCtxValue>({
  hasRole: () => false,
  isLoggedIn: false,
  user: defaultUser,
  logOut: () => {},
});

export default function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.auth.token);
  const tokenExpiration = useAppSelector((state) => state.auth.tokenExpiration);
  const user = useAppSelector((state) => state.auth.user);

  const hasRole: AuthCtxValue["hasRole"] = (roles) => {
    if (!user) {
      return false;
    }

    return roles.length === 0 || roles.includes(user.role);
  };

  const ctxValue = useMemo<AuthCtxValue>(() => {
    const currDate = new Date();
    const expiresDate = new Date(tokenExpiration);

    return {
      hasRole,
      isLoggedIn: token && user ? isBefore(currDate, expiresDate) : false,
      user: user || defaultUser,
      logOut: () => dispatch(resetAuthSlice()),
    };
  }, [token, tokenExpiration, user]);

  return <AuthCtx.Provider value={ctxValue}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
