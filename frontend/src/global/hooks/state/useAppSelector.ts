import { useSelector } from "react-redux";

import type { AppRootState } from "~state/store";

import type { TypedUseSelectorHook } from "react-redux";

/**
 * A variant of the redux `useSelector` hook that is correctly typed for use within the app
 */
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
