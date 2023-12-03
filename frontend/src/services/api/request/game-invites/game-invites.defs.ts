import { defineEndpoint } from "~api/helpers/defineEndpoint";

import { GameInviteSummaryResponse, ManyGameInvitesResponse } from "./game-invites.types";

import { IdUrlArg } from "~types";

export const allInvitesEndpoint = defineEndpoint({
  url: () => "game-invites",
  transformer: (data: ManyGameInvitesResponse) => data,
  methods: {
    get: {},
  },
});

export const acceptInviteEndpoint = defineEndpoint({
  url: ({ id }: IdUrlArg) => `game-invites/${id}/accept`,
  transformer: (data: GameInviteSummaryResponse) => data,
  methods: {
    post: {},
  },
});

export const declineInviteEndpoint = defineEndpoint({
  url: ({ id }: IdUrlArg) => `game-invites/${id}/decline`,
  transformer: (data: GameInviteSummaryResponse) => data,
  methods: {
    post: {},
  },
});
