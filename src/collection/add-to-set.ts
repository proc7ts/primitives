import { isIterable } from '../type/is-iterable.js';

/**
 * Adds elements to the given set.
 *
 * Adds to the set a single element, all `elements` of the given array, or nothing when `elements` is `null`
 * or `undefined`.
 *
 * @typeParam TElement - Type of elements in the set.
 * @param set - Target set to add elements to.
 * @param elements - Element(s) to add to the `set`. Either element, iterable of elements, `null`, or `undefined`.
 *
 * @returns The target `set`.
 */
export function addToSet<TElement>(
  set: Set<TElement>,
  elements: TElement | Iterable<TElement> | null | undefined,
): Set<TElement> {
  if (/*#__INLINE__*/ isIterable(elements)) {
    for (const element of elements) {
      set.add(element);
    }
  } else if (elements != null) {
    set.add(elements);
  }

  return set;
}
