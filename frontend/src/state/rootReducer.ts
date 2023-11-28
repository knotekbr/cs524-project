import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { baseApi } from "~api";

import { authReducer } from "./slices/authSlice";
import { uiReducer } from "./slices/uiSlice";

import type { PersistConfig } from "redux-persist";

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: [baseApi.reducerPath, "ui"],
} satisfies PersistConfig<any>;

export const rootReducer = persistReducer(
  rootPersistConfig,
  combineReducers({
    auth: authReducer,
    ui: uiReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  })
);
