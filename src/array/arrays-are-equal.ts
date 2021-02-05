import { areEqual } from '../value';

/**
 * Checks whether two arrays are equal.
 *
 * @typeParam T - Array elements type.
 * @param first - First array to compare.
 * @param second - Second array to compare.
 * @param length - The maximum number of elements to compare. Defaults to array length. Negative value means `0`.
 *
 * @returns `true` if up to `length` corresponding array elements are strictly equal to each other.
 */
export function arraysAreEqual<T>(
    first: ArrayLike<T>,
    second: ArrayLike<T>,
    length?: number | null,
): boolean;

/**
 * Checks whether two array ranges are equal.
 *
 * @typeParam T - Array elements type.
 * @param first - First array to compare.
 * @param second - Second array to compare. Negative or absent value means `0`.
 * @param from - The first element index to compare. Negative value means `0`. Absent value means array length.
 * @param to - The number one more than the last element index to compare.
 *
 * @returns `true` if all corresponding elements in corresponding array ranges are strictly equal to each other.
 */
export function arraysAreEqual<T>(
    first: ArrayLike<T>,
    second: ArrayLike<T>,
    from: number | null | undefined,
    to: number | null,
): boolean;

/**
 * Checks whether two arrays are equal by comparing corresponding elements with the given comparator function.
 *
 * @typeParam T - Array elements type.
 * @param first - First array to compare.
 * @param elementsAreEqual - Array elements comparator. Accepts elements to compare and their index as arguments.
 * Returns `true` if elements are equal, or `false` otherwise.
 * @param second - Second array to compare.
 * @param length - The maximum number of elements to compare. Defaults to array length.
 *
 * @returns `true` if `elementsAreEqual` comparator returned `true` for up to `length` corresponding array element
 * pairs.
 */
export function arraysAreEqual<T>(
    first: ArrayLike<T>,
    second: ArrayLike<T>,
    elementsAreEqual: (this: void, first: T, second: T, index: number) => boolean,
    length?: number | null,
): boolean;

/**
 * Checks whether two array ranges are equal by comparing corresponding elements with the given comparator function.
 *
 * @typeParam T - Array elements type.
 * @param first - First array to compare.
 * @param elementsAreEqual - Array elements comparator. Accepts elements to compare and their index as arguments.
 * Returns `true` if elements are equal, or `false` otherwise.
 * @param second - Second array to compare.
 * @param from - The first element index to compare. Negative value means `0`. Absent value means array length.
 * @param to - The number one more than the last element index to compare.
 *
 * @returns `true` if `elementsAreEqual` comparator returned `true` for up to `length` corresponding array element
 * pairs.
 */
export function arraysAreEqual<T>(
    first: ArrayLike<T>,
    second: ArrayLike<T>,
    elementsAreEqual: (this: void, first: T, second: T, index: number) => boolean,
    from: number | null | undefined,
    to: number | null,
): boolean;

export function arraysAreEqual<T>(
    first: ArrayLike<T>,
    second: ArrayLike<T>,
    compareOrFromOrLength?: ((this: void, first: T, second: T, index: number) => boolean) | number | null,
    fromOrLength?: number | null,
    to?: number | null,
): boolean {
  return typeof compareOrFromOrLength === 'function'
      ? arrayElementsAreEqual(
          first,
          second,
          compareOrFromOrLength,
          fromOrLength,
          to,
      )
      : arrayElementsAreEqual(
          first,
          second,
          areEqual,
          compareOrFromOrLength,
          fromOrLength,
      );
}

function arrayElementsAreEqual<T>(
    first: ArrayLike<T>,
    second: ArrayLike<T>,
    elementsAreEqual: (this: void, first: T, second: T, index: number) => boolean,
    fromOrLength?: number | null,
    to?: number | null,
): boolean {

  let start: number;
  let end: number;

  if (to !== undefined) {
    start = fromOrLength ? Math.max(fromOrLength, 0) : 0;
    end = to != null ? to : Math.max(first.length, second.length);
  } else if (fromOrLength != null) {
    start = 0;
    end = fromOrLength;
  } else {
    start = 0;
    end = Math.max(first.length, second.length);
  }

  if ((first.length <= end || second.length <= end) && first.length !== second.length) {
    return false;
  }

  for (let i = start; i < end; ++i) {
    if (!elementsAreEqual(first[i], second[i], i)) {
      return false;
    }
  }

  return true;
}
