import { defineEndpoint } from "~api/helpers/defineEndpoint";

import { ManyGamesResponse, OneGameResponse } from "./games.types";

import { GameplayState, IdUrlArg, IsoDateTime } from "~types";

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

export const adminAllGamesEndpoint = defineEndpoint({
  url: () => "games/admin",
  transformer: (data: ManyGamesResponse) => data,
  methods: {
    get: {},
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

export const gameplayEndpoint = defineEndpoint({
  url: ({ id }: IdUrlArg) => `games/${id}/play`,
  transformer: (data: OneGameResponse): GameplayState => ({
    ...data,
    boardState: [],
    categories: [],
    currPhase: "lobby",
    currPlayerId: 0,
    currRound: 0,
    phaseTimeUp: new Date().toISOString() as IsoDateTime,
    players: [],
    prompt: {
      category: "",
      prompt: "",
      responses: ["", "", "", ""],
      value: 0,
    },
  }),
  methods: {
    get: {},
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
