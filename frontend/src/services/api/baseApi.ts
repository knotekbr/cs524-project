import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { AppRootState } from "~state/store";

const baseQuery = fetchBaseQuery({
  baseUrl: `${ENV.API_BASE_URL}/`,
  prepareHeaders: (headers, api) => {
    const { token } = (api.getState() as AppRootState).auth;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  },
});

/** Array of tag types for use when caching/invalidating query responses */
export const tagTypes = [] as const;

export const baseApi = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes,
});
