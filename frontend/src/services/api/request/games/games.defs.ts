import { defineEndpoint } from "~api/helpers/defineEndpoint";

import { ManyGamesResponse, OneGameResponse } from "./games.types";

import { IdUrlArg } from "~types";

export const allGamesEndpoint = defineEndpoint({
  url: () => "games",
  transformer: (data: ManyGamesResponse) => data,
  methods: {
    get: {},
    post: {
      transformer: (data: OneGameResponse) => data,
    },
  },
});

export const activeGamesEndpoint = defineEndpoint({
  url: () => "games/active",
  transformer: (data: ManyGamesResponse) => data,
  methods: {
    get: {},
  },
});

export const showGameEndpoint = defineEndpoint({
  url: ({ id }: IdUrlArg) => `games/${id}`,
  transformer: (data: OneGameResponse) => data,
  methods: {
    get: {},
  },
});

export const joinGameEndpoint = defineEndpoint({
  url: ({ id }: IdUrlArg) => `games/${id}/join`,
  transformer: (data: OneGameResponse) => data,
  methods: {
    post: {},
  },
});

export const startGameEndpoint = defineEndpoint({
  url: ({ id }: IdUrlArg) => `games/${id}/start`,
  transformer: (data: OneGameResponse) => data,
  methods: {
    post: {},
  },
});

export const pauseGameEndpoint = defineEndpoint({
  url: ({ id }: IdUrlArg) => `games/${id}/pause`,
  transformer: (data: OneGameResponse) => data,
  methods: {
    post: {},
  },
});
