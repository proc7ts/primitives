/**
 * Checks whether the given `value` is present.
 *
 * @typeParam T - Type of the present value.
 * @param value - A value to check.
 *
 * @returns `true` when the given `value` is not `null` or `undefined`, or `false` otherwise.
 */
export function isPresent<T>(value: T | undefined | null): value is T {
  return value != null;
}

/**
 * Checks whether the given `value` is not present.
 *
 * This is a direct opposite to {@link isPresent()}.
 *
 * @typeParam T - Type of the present value.
 * @param value - A value to check.
 *
 * @returns `true` when the given `value` is `null` or `undefined`, or `false` otherwise.
 */
export function isNotPresent<T>(value: T | undefined | null): value is undefined | null {
  return value == null;
}

/**
 * Checks whether the given `value` is defined.
 *
 * @typeParam T - Type of the defined value.
 * @param value - A value to check.
 *
 * @returns `true` when `value !== undefined`, or `false` otherwise.
 */
export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

/**
 * Checks whether the given `value` is `undefined`.
 *
 * This is a direct opposite to {@link isDefined}.
 *
 * @typeParam T - Type of the defined value.
 * @param value - A value to check.
 *
 * @returns `true` when `value === undefined`, or `false` otherwise.
 */
export function isUndefined<T>(value: T | undefined): value is undefined {
  return value === undefined;
}

/**
 * Checks whether the given `value` is not `null`.
 *
 * @typeParam T - Type of the defined value.
 * @param value - A value to check.
 *
 * @returns `true` when `value !== null`, or `false` otherwise.
 */
export function isNotNull<T>(value: T | undefined): value is T {
  return value !== null;
}

/**
 * Checks whether the given `value` is `null`.
 *
 * This is a direct opposite to {@link isNotNull}`.
 *
 * @typeParam T - Type of the defined value.
 * @param value - A value to check.
 *
 * @returns `true` when `value === null`, or `false` otherwise.
 */
export function isNull<T>(value: T | undefined): value is undefined {
  return value === null;
}
