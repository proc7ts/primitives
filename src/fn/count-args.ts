/**
 * Counts meaningful arguments passed to function.
 *
 * Ignores trailing `undefined` values.
 *
 * @param args - Function call arguments tuple.
 *
 * @returns The number of arguments, except for the trailing `undefined` values.
 */
export function countArgs(args: ArrayLike<unknown>): number {
  let len = args.length;

  while (len > 0) {
    const idx = len - 1;

    if (args[idx] !== undefined) {
      break;
    }

    len = idx;
  }

  return len;
}
