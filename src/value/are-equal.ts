/**
 * Checks whether two values are strictly equal to each other.
 *
 * @typeParam T - A type of values.
 * @param first - First value to compare.
 * @param second - Second value to compare.
 *
 * @returns `true` if `first === second`, or `false` otherwise.
 */
export function areEqual<T = unknown>(first: T, second: T): boolean {
  return first === second;
}
