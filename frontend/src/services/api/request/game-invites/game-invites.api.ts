import { baseApi } from "~api";

import { acceptInviteEndpoint, allInvitesEndpoint, declineInviteEndpoint } from "./game-invites.defs";

const { get: getAllInvites } = allInvitesEndpoint;
const { post: acceptInvite } = acceptInviteEndpoint;
const { post: declineInvite } = declineInviteEndpoint;

export const gameInvitesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllInvites: getAllInvites.builder(build)({
      query: getAllInvites.defaultQuery,
      transformResponse: getAllInvites.transformer,
    }),
    acceptInvite: acceptInvite.builder(build)({
      query: acceptInvite.defaultQuery,
      transformResponse: acceptInvite.transformer,
    }),
    declineInvite: declineInvite.builder(build)({
      query: declineInvite.defaultQuery,
      transformResponse: declineInvite.transformer,
    }),
  }),
});

export const { useAcceptInviteMutation, useDeclineInviteMutation, useGetAllInvitesQuery, useLazyGetAllInvitesQuery } =
  gameInvitesApi;
