import { isArray } from '../type/is-array.js';
import { isIterable } from '../type/is-iterable.js';

/**
 * Converts element or array to array of elements.
 *
 * @typeParam TElement - Array element type.
 * @param value - Either element, array of elements, iterable of elements, `null`, or `undefined`.
 *
 * @returns The `value` itself if it is an array, empty array if `value` is `null` or `undefined`, array consisting of
 * iterable `value` elements, or an array containing only `value` otherwise.
 */
export function asArray<TElement>(value: TElement | TElement[] | Iterable<TElement> | null | undefined): TElement[];

/**
 * Converts element or readonly array of elements to readonly array of elements.
 *
 * @typeParam TElement - Array element type.
 * @param value - Either element, readonly array of elements, `null`, or `undefined`.
 *
 * @returns The `value` itself if it is an array, empty array if the `value` is `null` or `undefined`, or an array
 * containing only `value` otherwise.
 */
export function asArray<TElement>(value: TElement | readonly TElement[] | null | undefined): readonly TElement[];

export function asArray<TElement>(value: TElement | TElement[] | Iterable<TElement> | null | undefined): TElement[] {
  return (/*#__INLINE__*/ isArray(value))
      ? value
      : value == null
          ? []
          : isIterable(value)
              ? [...value]
              : [value];
}
