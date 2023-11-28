import { baseApi } from "~api";
import { setCredentials } from "~state/slices/authSlice";

import { createAccountEndpoint, logInEndpoint } from "./auth.defs";

const { post: logIn } = logInEndpoint;

const { post: createAccount } = createAccountEndpoint;

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    logIn: logIn.builder(build)({
      query: logIn.defaultQuery,
      transformResponse: logIn.transformer,
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const {
          data: { tokenExpiration, token, user },
        } = await queryFulfilled;

        dispatch(setCredentials({ token, user, tokenExpiration }));
      },
    }),

    createAccount: createAccount.builder(build)({
      query: createAccount.defaultQuery,
      transformResponse: createAccount.transformer,
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const {
          data: { tokenExpiration, token, user },
        } = await queryFulfilled;

        dispatch(setCredentials({ token, user, tokenExpiration }));
      },
    }),
  }),
});

export const { useCreateAccountMutation, useLogInMutation } = authApi;
