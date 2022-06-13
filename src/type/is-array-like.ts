/**
 * Checks whether the given value is array-like.
 *
 * @typeParam TElement - Array elements type.
 * @typeParam TOther - Non-array type the `value` may have.
 * @param value - A value to check.
 *
 * @returns `true` if the `value` has a `length` property, or `false` otherwise.
 */
export function isArrayLike<TElement, TOther = unknown>(
    value: ArrayLike<TElement> | TOther,
): value is ArrayLike<TElement> {
  return !!value && typeof value === 'object' && typeof (value as Partial<ArrayLike<TElement>>).length === 'number';
}
