/**
 * Checks whether the given value may have properties.
 *
 * @param value - The value to check.
 *
 * @returns `true` if the `value` is either a non-null object or function, or `false` otherwise.
 */
export function mayHaveProperties(value: unknown): value is object {
  return (typeof value === 'object' && !!value) || typeof value === 'function';
}
