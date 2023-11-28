import { createContext, forwardRef, useCallback, useContext, useMemo, useState } from "react";

import type { AlertProps } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Snackbar from "@mui/material/Snackbar";

import { useAppDispatch, useAppSelector } from "~hooks/state";
import { showSnackbar as reduxShowSnackbar, hideSnackbar as reduxHideSnackbar } from "~state/slices/uiSlice";

import type { DialogState, FeedbackCtxValue, FeedbackProviderProps } from "./FeedbackProvider.types";

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} variant="filled" ref={ref} style={{ width: "100%" }} {...props} />;
});

const FeedbackCtx = createContext<FeedbackCtxValue>({
  confirmChoice: async () => {},
  showSnackbar: () => {},
});

export default function FeedbackProvider({ children }: FeedbackProviderProps) {
  const snackbarOpen = useAppSelector((state) => state.ui.snackbarOpen);
  const snackbarSeverity = useAppSelector((state) => state.ui.snackbarSeverity);
  const snackbarMessage = useAppSelector((state) => state.ui.snackbarMessage);

  const dispatch = useAppDispatch();
  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
    message: "",
    onConfirm: async () => {},
    onCancel: async () => {},
  });

  const hideConfirmation = useCallback(() => {
    setDialogState((curr) => ({
      ...curr,
      open: false,
    }));
  }, []);

  const hideSnackbar = () => dispatch(reduxHideSnackbar());

  const ctxValue = useMemo<FeedbackCtxValue>(
    () => ({
      confirmChoice({ message, onConfirm, onCancel = () => {} }) {
        const wrappedConfirm = async () => {
          await onConfirm();
          hideConfirmation();
        };
        const wrappedCancel = async () => {
          await onCancel();
          hideConfirmation();
        };

        setDialogState({
          open: true,
          message,
          onConfirm: wrappedConfirm,
          onCancel: wrappedCancel,
        });
      },

      showSnackbar({ severity, message }) {
        dispatch(reduxShowSnackbar({ severity, message }));
      },
    }),
    []
  );

  return (
    <FeedbackCtx.Provider value={ctxValue}>
      {children}
      <Dialog open={dialogState.open} onClose={dialogState.onCancel}>
        <DialogContent>{dialogState.message}</DialogContent>
        <DialogActions>
          <Button onClick={dialogState.onCancel}>Cancel</Button>
          <Button variant="contained" onClick={dialogState.onConfirm}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={hideSnackbar}>
        <Alert severity={snackbarSeverity} onClose={hideSnackbar}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </FeedbackCtx.Provider>
  );
}

export const useFeedback = () => useContext(FeedbackCtx);
