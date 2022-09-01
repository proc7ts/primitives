/**
 * Merges two functions by calling one after another.
 *
 * Optionally merges function call results.
 *
 * @typeParam TArgs - Function parameter types as tuple.
 * @typeParam TReturn - A type of function result.
 * @typeParam TThis - A type if `this` object expected by function.
 * @param first - The first function to call.
 * @param second - The second function to call.
 * @param merge - Optional function call results merger. Accepts two function results as arguments and returns the final
 * result. When omitted the first function call result is ignored and the second function's call result is returned.
 *
 * @return A function that calls both of the given ones and merges their results. If one of the functions is absent,
 * then just returns another one. If both are absent, then returns `undefined`.
 */
export function mergeFunctions<TArgs extends unknown[], TReturn, TThis>(
  first: (this: TThis, ...args: TArgs) => TReturn,
  second: ((this: TThis, ...args: TArgs) => TReturn) | undefined,
  merge: (first: TReturn, second: TReturn) => TReturn,
): (this: TThis, ...args: TArgs) => TReturn;

export function mergeFunctions<TArgs extends unknown[], TReturn, TThis>(
  first: ((this: TThis, ...args: TArgs) => TReturn) | undefined,
  second: (this: TThis, ...args: TArgs) => TReturn,
  merge?: (first: TReturn, second: TReturn) => TReturn,
): (this: TThis, ...args: TArgs) => TReturn;

export function mergeFunctions<TArgs extends unknown[], TReturn, TThis>(
  first: ((this: TThis, ...args: TArgs) => TReturn) | undefined,
  second: ((this: TThis, ...args: TArgs) => TReturn) | undefined,
  merge?: (first: TReturn, second: TReturn) => TReturn,
): ((this: TThis, ...args: TArgs) => TReturn) | undefined;

export function mergeFunctions<TArgs extends unknown[], TReturn, TThis>(
  first: ((this: TThis, ...args: TArgs) => TReturn) | undefined,
  second: ((this: TThis, ...args: TArgs) => TReturn) | undefined,
  merge: (first: TReturn, second: TReturn) => TReturn = (_f, s) => s,
): ((this: TThis, ...args: TArgs) => TReturn) | undefined {
  if (!first) {
    return second;
  }
  if (!second) {
    return first;
  }

  return function (this: TThis, ...args: TArgs): TReturn {
    return merge(first.apply(this, args), second.apply(this, args));
  };
}
