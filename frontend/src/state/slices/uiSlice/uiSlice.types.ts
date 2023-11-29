import type { AlertColor } from "@mui/material";

export type UiSliceState = {
  snackbarOpen: boolean;
  snackbarSeverity: AlertColor;
  snackbarMessage: string;
};

export type ShowSnackbarPayload = {
  severity: AlertColor;
  message: string;
};
