/**
 * **Type Guard**
 *
 * Given a value, returns `true` if the value has a `data.message` string field
 *
 * @param value - The value to be checked
 *
 * @returns `True` if `value` has a `data.message` string field, or `false` otherwise
 */
export function isResponseWithMessage(value: unknown): value is { data: { message: string } } {
  if (!value || typeof value !== "object" || !("data" in value)) {
    return false;
  }

  const { data } = value;

  if (!data || typeof data !== "object" || !("message" in data)) {
    return false;
  }

  const { message } = data;

  return typeof message === "string";
}
