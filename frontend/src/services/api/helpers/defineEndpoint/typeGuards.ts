import type { MutationRequestDefinition, QueryRequestDefinition, RequestDefinition } from "./defineEndpoint.types";

/**
 * **Type Guard**
 *
 * Given a `RequestDefinition`, returns `true` if the definition is a `QueryRequestDefinition` or `false` otherwise
 *
 * **NOTE:** Because all properties in `QueryRequestDefinition` are optional, this guard will return `true` for any
 * object that does not contain `bodyParams` or `defaultBodyParams` properties
 *
 * @param definition - The `RequestDefinition` to be checked
 *
 * @returns `True` if `definition` is a `QueryRequestDefinition` or `false` otherwise
 */
export function isQueryDefinition(definition: RequestDefinition): definition is QueryRequestDefinition {
  return typeof definition === "object" && !("bodyParams" in definition) && !("defaultBodyParams" in definition);
}

/**
 * **Type Guard**
 *
 * Given a `RequestDefinition`, returns `true` if the definition is a `MutationRequestDefinition` or `false` otherwise
 *
 * **NOTE:** Because all properties in `MutationRequestDefinition` are optional, this guard will return `true` for any
 * object
 *
 * @param definition - The `RequestDefinition` to be checked
 *
 * @returns `True` if `definition` is a `MutationRequestDefinition` or `false` otherwise
 */
export function isMutationDefinition(definition: RequestDefinition): definition is MutationRequestDefinition {
  return typeof definition === "object";
}
