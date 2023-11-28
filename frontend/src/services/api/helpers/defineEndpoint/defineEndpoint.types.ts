import type { OptionalKeys, StringKeys } from "~types";

import type { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import type { BaseQueryFn, FetchArgs } from "@reduxjs/toolkit/query/react";

type HTTPMethod = "delete" | "get" | "patch" | "post" | "put";

type ResponseTransformer<TRaw = any, TTransformed = any> = (rawResponse: TRaw, meta?: {}, arg?: any) => TTransformed;

interface QueryRequestDefinition {
  /**
   * (Optional) A response transformer for this request method that overrides the endpoint-level transformer
   */
  transformer?: ResponseTransformer;
  /**
   * (Optional) An empty object that is typed to include the expected query params for this request
   */
  queryParams?: any;
  /**
   * (Optional) An object containing default query params that should be sent with this request
   *
   * **NOTE:** If a regular query param is provided with the same name as any default param, it will take precedence
   * over the default value
   */
  defaultQueryParams?: any;
}

interface MutationRequestDefinition extends QueryRequestDefinition {
  /**
   * (Optional) An empty object that is typed to include the expected body params for this request
   */
  bodyParams?: any;
  /**
   * (Optional) An object containing default body params that should be sent with this request
   *
   * **NOTE:** If a regular body param is provided with the same name as any default param, it will take precedence
   * over the default value
   */
  defaultBodyParams?: any;
  /**
   * (Optional) An object containing extra arguments for use while processing this request
   *
   * These arguments are used client-side only (eg. for implementing optimistic updates), and are not included in the
   * actual HTTP request
   *
   * **NOTE:** When triggering a request, this object is always optional, even if it includes required fields
   */
  extraArgs?: any;
}

type RequestDefinition = QueryRequestDefinition | MutationRequestDefinition;

type URLParams<TEndpoint extends EndpointDefinition<any>> = Parameters<TEndpoint["url"]> extends [infer T] ? T : void;

type BodyParams<TRequest extends RequestDefinition> = TRequest extends MutationRequestDefinition
  ? TRequest["bodyParams"] extends {}
    ? TRequest["bodyParams"]
    : void
  : void;

type QueryParams<TRequest extends RequestDefinition> = TRequest["queryParams"] extends {}
  ? TRequest["queryParams"]
  : void;

type ExtraArgs<TRequest extends RequestDefinition> = TRequest extends MutationRequestDefinition
  ? TRequest["extraArgs"] extends {}
    ? TRequest["extraArgs"]
    : void
  : void;

type RawResponse<
  TE extends ResponseTransformer,
  TR extends ResponseTransformer | undefined,
> = TR extends ResponseTransformer<infer TRaw, any> ? TRaw : TE extends ResponseTransformer<infer TRaw> ? TRaw : any;

type ResultType<
  TE extends ResponseTransformer,
  TR extends ResponseTransformer | undefined,
> = TR extends ResponseTransformer<any, infer TTransformed>
  ? TTransformed
  : TE extends ResponseTransformer<any, infer TTransformed>
    ? TTransformed
    : any;

// I hate this type
type QueryArg<TEndpoint extends EndpointDefinition<any>, TRequest extends RequestDefinition> = URLParams<TEndpoint> &
  BodyParams<TRequest> &
  QueryParams<TRequest> &
  ExtraArgs<TRequest> extends {}
  ? URLParams<TEndpoint> & BodyParams<TRequest> & ExtraArgs<TRequest> extends {}
    ? (URLParams<TEndpoint> extends void ? {} : { urlParams: URLParams<TEndpoint> }) &
        (BodyParams<TRequest> extends void ? {} : { bodyParams: BodyParams<TRequest> }) &
        (QueryParams<TRequest> extends void
          ? {}
          : keyof QueryParams<TRequest> extends OptionalKeys<QueryParams<TRequest>>
            ? { queryParams?: QueryParams<TRequest> }
            : { queryParams: QueryParams<TRequest> }) &
        (ExtraArgs<TRequest> extends void ? {} : { extraArgs?: ExtraArgs<TRequest> })
    : keyof QueryParams<TRequest> extends OptionalKeys<QueryParams<TRequest>>
      ? { queryParams?: QueryParams<TRequest> } | void | null
      : { queryParams: QueryParams<TRequest> }
  : void | null;

type EndpointMethods = {
  [RVerb in HTTPMethod]: (RVerb extends "get"
    ? Record<RVerb, QueryRequestDefinition>
    : Record<RVerb, MutationRequestDefinition>) & {
    [OVerb in Exclude<HTTPMethod, RVerb>]?: OVerb extends "get" ? QueryRequestDefinition : MutationRequestDefinition;
  };
}[HTTPMethod];

type EndpointDefinition<TMethods extends EndpointMethods> = {
  /**
   * A callback that accepts the URL params associated with this endpoint (if there are any) and returns the URL of the
   * endpoint
   */
  url: (arg: any) => string;
  /**
   * A global response transformer for all request methods associated with this endpoint. Can be overriden on a
   * method-by-method basis in `methods`
   */
  transformer: ResponseTransformer;
  /**
   * An object containing one or more allowed request methods for this endpoint
   */
  methods: TMethods;
};

type ValidatedQueryRequest<TEndpoint extends EndpointDefinition<any>, TRequest extends QueryRequestDefinition> = {
  /**
   * A default query callback to be used as the value of the `query` property when defining a request in RTK Query
   */
  defaultQuery: (arg: QueryArg<TEndpoint, TRequest>) => FetchArgs;
  /**
   * A response transformer callback to be used as the value of the `transformResponse` property when defining a request
   * in RTK Query
   */
  transformer: ResponseTransformer<
    RawResponse<TEndpoint["transformer"], TRequest["transformer"]>,
    ResultType<TEndpoint["transformer"], TRequest["transformer"]>
  >;
  /**
   * Method that accepts an RTK Query `EndpointBuilder` and returns the builder's `query` method with proper types
   * applied
   */
  builder: <BaseQuery extends BaseQueryFn, TagTypes extends string, ReducerPath extends string>(
    build: EndpointBuilder<BaseQuery, TagTypes, ReducerPath>
  ) => typeof build.query<ResultType<TEndpoint["transformer"], TRequest["transformer"]>, QueryArg<TEndpoint, TRequest>>;
  /**
   * The default query params for this request, to be used when manually defining a `query` callback in RTK Query
   */
  defaultQueryParams: TRequest["defaultQueryParams"] extends {} ? TRequest["defaultQueryParams"] : {};
  /**
   * Empty objects that are correctly typed to be provided as generic values to RTK Query's `build.query` or
   * `build.mutation`
   */
  Types: {
    /**
     * The second generic parameter to provide to `build.query` or `build.mutation`
     *
     * Represents the type of the full query argument for this request
     */
    QueryArg: QueryArg<TEndpoint, TRequest>;
    /**
     * The first generic parameter to provide to `build.query` or `build.mutation`
     *
     * Represents the type of the transformed response returned by this request
     */
    ResultType: ResultType<TEndpoint["transformer"], TRequest["transformer"]>;
  };
};

type ValidatedMutationRequest<
  TEndpoint extends EndpointDefinition<any>,
  TRequest extends MutationRequestDefinition,
> = Omit<ValidatedQueryRequest<TEndpoint, TRequest>, "builder"> & {
  /**
   * Method that accepts an RTK Query `EndpointBuilder` and returns the builder's `mutation` method with proper types
   * applied
   */
  builder: <BaseQuery extends BaseQueryFn, TagTypes extends string, ReducerPath extends string>(
    build: EndpointBuilder<BaseQuery, TagTypes, ReducerPath>
  ) => typeof build.mutation<
    ResultType<TEndpoint["transformer"], TRequest["transformer"]>,
    QueryArg<TEndpoint, TRequest>
  >;
  /**
   * The default body params for this request, to be used when manually defining a `query` callback in RTK Query
   */
  defaultBodyParams: TRequest["defaultBodyParams"] extends {} ? TRequest["defaultBodyParams"] : {};
};

type ValidatedEndpoint<TEndpoint extends EndpointDefinition<EndpointMethods>> = TEndpoint extends EndpointDefinition<
  infer TMethods
>
  ? {
      [TMethod in StringKeys<TMethods>]: TMethod extends "get"
        ? TMethods[TMethod] extends QueryRequestDefinition
          ? ValidatedQueryRequest<TEndpoint, TMethods[TMethod]>
          : never
        : TMethods[TMethod] extends MutationRequestDefinition
          ? ValidatedMutationRequest<TEndpoint, TMethods[TMethod]>
          : never;
    }
  : never;

export type {
  EndpointDefinition,
  EndpointMethods,
  HTTPMethod,
  MutationRequestDefinition,
  QueryArg,
  QueryRequestDefinition,
  RequestDefinition,
  ResultType,
  ValidatedEndpoint,
  ValidatedMutationRequest,
  ValidatedQueryRequest,
};
