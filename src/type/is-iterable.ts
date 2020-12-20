/**
 * @packageDocumentation
 * @module @proc7ts/primitives
 */
/**
 * Checks whether the given object is iterable.
 *
 * @typeParam TElement  Iterable elements type.
 * @typeParam TOther  Non-iterable value type.
 * @param value - An object value to check.
 *
 * @returns `true` if the `value` has a `[Symbol.iterator]` property set, or `false` otherwise.
 */
export function isIterable<TElement, TOther>(value: Iterable<TElement> | TOther): value is Iterable<TElement> {
  return !!(value as Iterable<TElement>)[Symbol.iterator];
}
