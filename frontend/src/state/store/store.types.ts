import type { store } from "./store";

export type AppStore = typeof store;
export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
