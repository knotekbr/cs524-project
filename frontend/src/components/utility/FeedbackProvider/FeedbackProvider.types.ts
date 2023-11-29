import type { AlertColor } from "@mui/material";

export type DialogState = {
  open: boolean;
  message: string;
  onConfirm: () => Promise<void>;
  onCancel: () => Promise<void>;
};

export type SnackbarState = {
  open: boolean;
  message: string;
  severity: AlertColor;
};

export type ConfirmChoiceOptions = {
  /** The message to be displayed in the confirmation dialog */
  message: string;
  /** Callback executed when the user confirms the choice */
  onConfirm: () => void | Promise<void>;
  /** (Optional) Callback executed when the user cancels the choice */
  onCancel?: () => void | Promise<void>;
};

export type ShowSnackbarOptions = {
  /** The severity of the snackbar. Impacts background color and icon */
  severity: AlertColor;
  /** The message to be displayed in the snackbar */
  message: string;
};

export type FeedbackCtxValue = {
  confirmChoice: (options: ConfirmChoiceOptions) => void;
  showSnackbar: (options: ShowSnackbarOptions) => void;
};

export type FeedbackProviderProps = {
  children?: React.ReactNode;
};
