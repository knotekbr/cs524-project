import { useDispatch } from "react-redux";

import type { AppDispatch } from "~state/store";

/**
 * A variant of the redux `useDispatch` hook that is correctly typed for use within the app
 */
export const useAppDispatch: () => AppDispatch = useDispatch;
