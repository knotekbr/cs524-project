import { isMutationDefinition, isQueryDefinition } from "./typeGuards";

import type {
  EndpointDefinition,
  EndpointMethods,
  HTTPMethod,
  RequestDefinition,
  ValidatedEndpoint,
  ValidatedMutationRequest,
  ValidatedQueryRequest,
} from "./defineEndpoint.types";

/**
 * Accepts an endpoint definition containing all the required information about a specific API endpoint (ie, a unique
 * API URL) & the request methods it supports, and returns a `ValidatedEndpoint` for use when defining requests with RTK
 * Query.
 *
 * @param endpoint - An `EndpointDefinition` object describing the API endpoint and its request methods
 *
 * @returns A `ValidatedEndpoint` object for use when defining requests with RTK Query
 *
 * @example
 * ```ts
 * // In endpoint definition file
 * const userEndpoint = defineEndpoint({
 *   url: (params: {userID: number}) => `/users/${params.userID}`,
 *   transformer: (rawResponse: UserResponse1): UserObject => rawResponse.user,
 *   methods: {
 *     get: {
 *       defaultQueryParams: {
 *         withRoles: true,
 *       }
 *     },
 *     patch: {
 *       bodyParams: {} as Partial<UserObject>,
 *     },
 *     put: {
 *       // PUT request returns a string ID, different transformer required
 *       transformer: (rawResponse: UserResponse2): UserObject => ({
 *         ...rawResponse.user,
 *         id: parseInt(rawResponse.user.id),
 *       }),
 *       bodyParams: {} as Partial<UserObject>,
 *     }
 *   }
 * });
 *
 * // In API slice file
 * const { get: getUser, patch: patchUser, put: putUser } = userEndpoint;
 *
 * const usersAPI = baseAPI.injectEndpoints({
 *   endpoints: (build) => ({
 *     getUser: getUser.builder(build)({
 *       query: getUser.defaultQuery,
 *       transformResponse: getUser.transformer,
 *     }),
 *     updateUser: patchUser.builder(build)({
 *       query: patchUser.defaultQuery,
 *       transformResponse: patchUser.transformer,
 *     }),
 *     upsertUser: putUser.builder(build)({
 *       query: putUser.defaultQuery,
 *       transformResponse: putUser.transformer,
 *     }),
 *   })
 * })
 *
 * export const { useGetUserQuery, useUpdateUserMutation, useUpsertUserMutation } = usersAPI;
 * ```
 */
export function defineEndpoint<TEndpoint extends EndpointDefinition<EndpointMethods>>(
  endpoint: TEndpoint
): ValidatedEndpoint<TEndpoint> {
  const { methods } = endpoint;
  const validatedEndpoint = {} as ValidatedEndpoint<TEndpoint>;

  for (const [method, definition] of Object.entries(methods) as [HTTPMethod, RequestDefinition][]) {
    if (method === "get" && isQueryDefinition(definition)) {
      const defaultQueryParams = definition.defaultQueryParams || {};
      const validatedRequest: ValidatedQueryRequest<TEndpoint, any> = {
        defaultQuery: (arg) => ({
          url: arg && "urlParams" in arg ? endpoint.url(arg.urlParams) : endpoint.url(null),
          method: "GET",
          params: {
            ...defaultQueryParams,
            ...(arg && "queryParams" in arg && arg.queryParams),
          },
        }),
        defaultQueryParams: definition.defaultQueryParams || {},
        transformer: definition.transformer || endpoint.transformer,
        builder: (build) => build.query,
        Types: {
          QueryArg: {} as any,
          ResultType: {} as any,
        },
      };

      (validatedEndpoint as any).get = validatedRequest;
    } else if (method !== "get" && isMutationDefinition(definition)) {
      const defaultQueryParams = definition.defaultQueryParams || {};
      const defaultBodyParams = definition.defaultBodyParams || {};
      const validatedRequest: ValidatedMutationRequest<TEndpoint, any> = {
        defaultQuery: (arg) => ({
          url: arg && "urlParams" in arg ? endpoint.url(arg.urlParams) : endpoint.url(null),
          method: method.toUpperCase(),
          params: {
            ...defaultQueryParams,
            ...(arg && "queryParams" in arg && arg.queryParams),
          },
          body: {
            ...defaultBodyParams,
            ...(arg && "bodyParams" in arg && arg.bodyParams),
          },
        }),
        defaultQueryParams: definition.defaultQueryParams || {},
        defaultBodyParams: definition.defaultBodyParams || {},
        transformer: definition.transformer || endpoint.transformer,
        builder: (build) => build.mutation,
        Types: {
          QueryArg: {} as any,
          ResultType: {} as any,
        },
      };

      (validatedEndpoint as any)[method] = validatedRequest;
    }
  }

  return validatedEndpoint;
}
