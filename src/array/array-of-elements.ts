/**
 * @packageDocumentation
 * @module @proc7ts/primitives
 */

/**
 * Checks whether the given value is an array.
 *
 * @param value  Either element, array of elements, `null`, or `undefined`.
 *
 * @returns `true` if the given `value` is an array, or `false` otherwise.
 */
export function isArrayOfElements<T>(value: T | T[] | null | undefined): value is T[];

/**
 * Checks whether the given value is a readonly array.
 *
 * @param value  Either element, readonly array of elements, `null`, or `undefined`.
 *
 * @returns `true` if the given `value` is an array, or `false` otherwise.
 */
export function isArrayOfElements<T>(value: T | readonly T[] | null | undefined): value is readonly T[];

export function isArrayOfElements<T>(value: T | readonly T[] | null | undefined): value is T[] {
  return Array.isArray(value);
}

/**
 * Converts element or array of elements to array of elements.
 *
 * @param value  Either element, array of elements, `null`, or `undefined`.
 *
 * @returns The `value` itself if it is an array, empty array if `value` is `null` or `undefined`, or an array
 * containing only `value` otherwise.
 */
export function arrayOfElements<T>(value: T | T[] | null | undefined): T[];

/**
 * Converts element or readonly array of elements to readonly array of elements.
 *
 * @param value  Either element, readonly array of elements, `null`, or `undefined`.
 *
 * @returns The `value` itself if it is an array, empty array if the `value` is `null` or `undefined`, or an array
 * containing only `value` otherwise.
 */
export function arrayOfElements<T>(value: T | readonly T[] | null | undefined): readonly T[];

export function arrayOfElements<T>(value: T | T[] | null | undefined): T[] {
  return (/*#__INLINE__*/ isArrayOfElements(value)) ? value : value != null ? [value] : [];
}
