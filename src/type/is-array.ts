/**
 * Checks whether the given value is an array.
 *
 * @typeParam TElement - Array element type.
 * @typeParam TOther - Non-array value type the `value` may have.
 * @param value - Either element, array of elements, `null`, or `undefined`.
 *
 * @returns `true` if the given `value` is an array, or `false` otherwise.
 */
export function isArray<TElement, TOther = unknown>(value: TElement[] | TOther): value is TElement[];

/**
 * Checks whether the given value is a readonly array.
 *
 * @typeParam TElement - Array element type.
 * @typeParam TOther - Non-array value type the `value` may have.
 * @param value - Either element, readonly array of elements, `null`, or `undefined`.
 *
 * @returns `true` if the given `value` is an array, or `false` otherwise.
 */
export function isArray<TElement, TOther = unknown>(value: readonly TElement[] | TOther): value is readonly TElement[];

export function isArray<TElement, TOther>(value: TElement[] | readonly TElement[] | TOther): value is TElement[] {
  return Array.isArray(value);
}
