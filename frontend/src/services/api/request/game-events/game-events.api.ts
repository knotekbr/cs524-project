import { baseApi } from "~api";

import { allGameEventsEndpoint } from "./game-events.defs";

const { get: getGameEvents } = allGameEventsEndpoint;

export const gameEventsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getGameEvents: getGameEvents.builder(build)({
      query: getGameEvents.defaultQuery,
      transformResponse: getGameEvents.transformer,
    }),
  }),
});

export const { useGetGameEventsQuery } = gameEventsApi;
