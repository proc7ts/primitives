import { isIterable } from '../type/is-iterable.js';

/**
 * Builds a set of the given element or array.
 *
 * @typeParam TElement - Type of elements in the set.
 * @param elements Either element, iterable of elements, `null`, or `undefined`.
 *
 * @returns A new set containing all the given elements, or empty set if `elements` is `null` or `undefined`.
 */
export function asSet<TElement>(
  elements: TElement | Iterable<TElement> | null | undefined,
): Set<TElement> {
  return /*#__INLINE__*/ isIterable(elements)
    ? new Set(elements)
    : elements == null
    ? new Set()
    : new Set<TElement>().add(elements);
}
