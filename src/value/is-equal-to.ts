/**
 * Checks whether the first value is strictly equal to the second one.
 *
 * @param first - First value to compare.
 * @param second - Second value to compare.
 *
 * @returns `true` if `first === second`, or `false` otherwise.
 */
export function isEqualTo<T>(first: T, second: T): boolean {
  return first === second;
}
