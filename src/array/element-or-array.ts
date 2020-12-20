/**
 * @packageDocumentation
 * @module @proc7ts/primitives
 */

/**
 * Builds element or array of the given elements.
 *
 * @param source - A source of elements as their iterable or array-like container.
 *
 * @returns The only element of the `source`, an array of all elements of non-empty source, or `undefined` if the
 * `source` is empty.
 */
export function elementOrArray<T>(source: Iterable<T> | ArrayLike<T>): T | T[] | undefined {

  const array = Array.from(source);
  const { length } = array;

  if (length) {
    return length === 1 ? array[0] : array;
  }

  return;
}
