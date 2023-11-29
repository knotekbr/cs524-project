import { defineEndpoint } from "~api/helpers/defineEndpoint";

import type { CreateAccountDto, LoginDto } from "~types";

import type { AuthResponse } from "./auth.types";

export const logInEndpoint = defineEndpoint({
  // Use full URL because this endpoint does not contain the "/api/" path segment
  url: () => "auth/login",
  transformer: (data: AuthResponse) => data,
  methods: {
    post: {
      bodyParams: {} as LoginDto,
    },
  },
});

export const createAccountEndpoint = defineEndpoint({
  // Use full URL because this endpoint does not contain the "/api/" path segment
  url: () => "auth/create-account",
  transformer: (data: AuthResponse) => data,
  methods: {
    post: {
      bodyParams: {} as CreateAccountDto,
    },
  },
});
