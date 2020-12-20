/**
 * @packageDocumentation
 * @module @proc7ts/primitives
 */
/**
 * A function that returns its argument as is.
 *
 * @param value - A value to return.
 *
 * @returns `value`.
 */
export function asis<T>(value: T): T {
  return value;
}
