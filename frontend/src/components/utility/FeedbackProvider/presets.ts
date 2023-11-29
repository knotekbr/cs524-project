import type { SnackbarState } from "./FeedbackProvider.types";

/**
 * A collection of methods that return common confirmation messages for use with `useFeedback().showConfirmation()`
 */
export const confirmationMessages = {
  /**
   * ```ts
   * `Are you sure you want to delete ${varText}? This cannot be undone.`
   * ```
   */
  deleteItem: (varText) => `Are you sure you want to delete ${varText}? This cannot be undone.`,

  /**
   * ```ts
   * "Are you sure you want to leave? You will lose any unsaved work."
   * ```
   */
  unsavedWork: () => "Are you sure you want to leave? You will lose any unsaved work.",
} satisfies Record<string, (varText: string) => string>;

/**
 * A collection of methods that return common snackbar options for use with `useFeedback().showSnackbar()`
 */
export const snackbarOptions = {
  /**
   * ```ts
   * warning: "Please review the form for errors then try your submission again"
   * ```
   */
  formErrors: () => ({
    message: "Please review the form for errors then try your submission again",
    severity: "warning",
  }),

  /**
   * ```ts
   * error: "An unexpected error has occurred"
   * ```
   */
  genericError: () => ({ message: "An unexpected error has occurred", severity: "error" }),

  /**
   * ```ts
   * success: `A new ${varText} has been added`
   * ```
   */
  itemAdded: (varText) => ({ message: `A new ${varText} has been added`, severity: "success" }),

  /**
   * ```ts
   * success: `${varText} has been updated`
   * ```
   */
  itemUpdated: (varText) => ({ message: `${varText} has been updated`, severity: "success" }),

  /**
   * ```ts
   * success: `${varText} has been deleted`
   * ```
   */
  itemDeleted: (varText) => ({ message: `${varText} has been deleted`, severity: "success" }),

  /**
   * ```ts
   * success: "Settings saved"
   * ```
   */
  settingsSaved: () => ({ message: "Your settings have been updated", severity: "success" }),
} satisfies Record<string, (varText: string) => Omit<SnackbarState, "open">>;
