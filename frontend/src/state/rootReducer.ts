import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { baseApi } from "~api";
import { authReducer } from "~state/slices/authSlice";

import type { PersistConfig } from "redux-persist";

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: [baseApi.reducerPath],
} satisfies PersistConfig<any>;

export const rootReducer = persistReducer(
  rootPersistConfig,
  combineReducers({
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  })
);
