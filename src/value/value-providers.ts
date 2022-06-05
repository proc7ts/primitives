/**
 * Creates a provider of the only argument.
 *
 * @param value - A value to return.
 *
 * @returns A function that returns `value`.
 */
export function valueProvider<T>(value: T): (this: void) => T {
  return (): T => value;
}

/**
 * Creates a provider of arguments tuple.
 *
 * The returned tuple should never be modified as it is not cloned.
 *
 * @param values - Values to return.
 *
 * @returns A function that returns `values` tuple.
 */
export function valuesProvider<T extends readonly any[]>(...values: T): (this: void) => T {
  return (): T => values;
}
