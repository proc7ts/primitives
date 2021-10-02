import { isArrayOfElements } from './array-of-elements';

/**
 * Builds a set of the given element or array of elements.
 *
 * @param elements Either element, readonly array of elements, `null`, or `undefined`.
 *
 * @returns A new set containing all of the given elements, or empty set if `elements` is `null` or `undefined`.
 */
export function setOfElements<T>(elements: T | readonly T[] | null | undefined): Set<T> {
  return (/*#__INLINE__*/ isArrayOfElements(elements))
      ? new Set(elements)
      : (elements != null ? new Set([elements]) : new Set());
}

/**
 * Adds element of array of elements to the given set.
 *
 * Adds to the set a single element, all `elements` of the given array, or nothing when `elements` is `null`
 * or `undefined`.
 *
 * @param set - Target set to add elements to.
 * @param elements - Element(s) to add to the `set`. Either element, readonly array of elements, `null`, or `undefined`.
 *
 * @returns The target `set`.
 */
export function extendSetOfElements<T>(set: Set<T>, elements: T | readonly T[] | null | undefined): Set<T> {
  if (/*#__INLINE__*/ isArrayOfElements(elements)) {
    elements.forEach(element => set.add(element));
  } else if (elements != null) {
    set.add(elements);
  }

  return set;
}
