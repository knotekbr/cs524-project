import { createSlice, isRejectedWithValue } from "@reduxjs/toolkit";

import { snackbarOptions } from "~components/utility/FeedbackProvider";

import { isResponseWithMessage } from "./typeGuards";

import type { ShowSnackbarPayload, UiSliceState } from "./uiSlice.types";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: UiSliceState = {
  snackbarOpen: false,
  snackbarSeverity: "success",
  snackbarMessage: "",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<ShowSnackbarPayload>) => {
      const { message, severity } = action.payload;

      state.snackbarMessage = message;
      state.snackbarSeverity = severity;
      state.snackbarOpen = true;
    },
    hideSnackbar: (state) => {
      state.snackbarOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isRejectedWithValue, (state, { payload }) => {
      const { message: genericMessage, severity } = snackbarOptions.genericError();

      state.snackbarMessage = isResponseWithMessage(payload) ? payload.data.message : genericMessage;
      state.snackbarSeverity = severity;
      state.snackbarOpen = true;
    });
  },
});

export const uiReducer = uiSlice.reducer;
export const { showSnackbar, hideSnackbar } = uiSlice.actions;

export { initialState as uiSliceInitialState };
