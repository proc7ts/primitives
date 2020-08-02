/**
 * @packageDocumentation
 * @module @proc7ts/primitives
 */

/**
 * Converts a value to its promise.
 *
 * @param value  Either a value, or a promise-like instance resolving to it.
 *
 * @returns A promise resolving to the given value.
 */
export function asyncValue<T>(value: T | PromiseLike<T>): Promise<T> {
  return (async () => value)();
}
