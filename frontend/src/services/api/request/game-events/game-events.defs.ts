import { defineEndpoint } from "~api/helpers/defineEndpoint";

import { AllGameEventsResponse } from "./game-events.types";

import { IdUrlArg } from "~types";

export const allGameEventsEndpoint = defineEndpoint({
  url: ({ id }: IdUrlArg) => `game-events/${id}`,
  transformer: (data: AllGameEventsResponse) => data,
  methods: {
    get: {},
  },
});
