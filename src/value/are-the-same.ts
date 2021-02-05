/**
 * Checks whether two values are the same. I.e. strictly equal to each other.
 *
 * @typeParam T - A type of values.
 * @param first - First value to compare.
 * @param second - Second value to compare.
 *
 * @returns `true` if `first === second`, or `false` otherwise.
 */
export function areTheSame<T>(first: T, second: T): boolean {
  return first === second;
}
