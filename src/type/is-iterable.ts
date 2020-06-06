/**
 * @packageDocumentation
 * @module @proc7ts/primitives
 */
/**
 * Checks whether the given object is iterable.
 *
 * @param value  An object value to check.
 *
 * @returns `true` if the `value` has a `[Symbol.iterator]` property set, or `false` otherwise.
 */
export function isIterable<T>(value: object): value is Iterable<T> {
  return !!(value as Iterable<T>)[Symbol.iterator];
}
