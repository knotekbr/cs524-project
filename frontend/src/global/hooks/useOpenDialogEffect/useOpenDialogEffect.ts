import { useEffect } from "react";

/**
 * Executes a callback every time a dialog is opened, or any of the provided `extraDeps` change
 *
 * @param open - Boolean indicating whether the dialog is currently open
 * @param fn - Callback to execute
 * @param extraDeps - (Optional) Array of extra dependencies (other than `open`) to provide to `useEffect`
 */
export function useOpenDialogEffect(open: boolean, fn: () => void, extraDeps: React.DependencyList = []) {
  useEffect(() => {
    if (open) {
      fn();
    }
  }, [open, ...extraDeps]);
}
