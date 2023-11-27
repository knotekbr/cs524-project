import { createSlice } from "@reduxjs/toolkit";

import type { IsoDateTime } from "~types";

import type { AuthSliceState } from "./authSlice.types";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthSliceState = {
  token: "",
  tokenExpiration: new Date().toISOString() as IsoDateTime,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthSliceState>) => ({
      ...state,
      ...action.payload,
    }),
    resetAuthSlice: () => ({ ...initialState }),
  },
});

export const authReducer = authSlice.reducer;
export const { resetAuthSlice, setCredentials } = authSlice.actions;

export { initialState as authSliceInitialState };
