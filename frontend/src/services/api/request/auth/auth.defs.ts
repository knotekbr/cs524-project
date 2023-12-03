import { defineEndpoint } from "~api/helpers/defineEndpoint";

import type { CreateAccountDto, LoginDto } from "~types";

import type { AuthResponse } from "./auth.types";

export const logInEndpoint = defineEndpoint({
  url: () => "auth/login",
  transformer: (data: AuthResponse) => data,
  methods: {
    post: {
      bodyParams: {} as LoginDto,
    },
  },
});

export const createAccountEndpoint = defineEndpoint({
  url: () => "auth/create-account",
  transformer: (data: AuthResponse) => data,
  methods: {
    post: {
      bodyParams: {} as CreateAccountDto,
    },
  },
});
