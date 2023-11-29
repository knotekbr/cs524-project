/**
 * Utility type that generates a string union of all keys in `T` that are optional (ie, allow `undefined` as a value)
 */
export type OptionalKeys<T> = { [K in keyof T]: undefined extends T[K] ? K : never }[keyof T];

/**
 * Utility type that generates a string union of all keys in `T` that are strings. Symbol and number keys are excluded
 */
export type StringKeys<T> = {
  [Key in keyof T]: Key extends string ? Key : never;
}[keyof T];
