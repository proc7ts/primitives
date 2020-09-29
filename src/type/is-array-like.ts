/**
 * @packageDocumentation
 * @module @proc7ts/primitives
 */
/**
 * Checks whether the given value is array-like.
 *
 * @param value  A value to check.
 *
 * @returns `true` if the `value` has a `length` property, or `false` otherwise.
 */
export function isArrayLike<T>(value: any): value is ArrayLike<T> {
  return !!value && typeof value === 'object' && typeof (value as Partial<ArrayLike<T>>).length === 'number';
}
