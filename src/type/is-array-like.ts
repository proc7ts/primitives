/**
 * @packageDocumentation
 * @module @proc7ts/primitives
 */
/**
 * Checks whether the given value is array-like.
 *
 * @param target  A value to check.
 *
 * @returns `true` if the `value` has a `length` property, or `false` otherwise.
 */
export function isArrayLike<T>(target: any): target is ArrayLike<T> {
  return !!target && typeof target === 'object' && typeof target.length === 'number';
}
