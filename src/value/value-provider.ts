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
