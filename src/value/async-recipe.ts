/**
 * Asynchronous recipe of value evaluation.
 *
 * This is either a value as-is, a promise-like instance resolving to it, or its {@link AsyncRecipe.Evaluator evaluator}
 * function.
 *
 * @typeParam TValue - Evaluated value type. This can not be a function.
 * @typeParam TArgs - A type of parameters tuple required for value evaluation.
 */
export type AsyncRecipe<TValue, TArgs extends any[] = []> =
    | TValue
    | PromiseLike<TValue>
    | AsyncRecipe.Evaluator<TValue, TArgs>;

export namespace AsyncRecipe {

  /**
   * Asynchronous value evaluator signature.
   *
   * @typeParam TValue - Evaluated value type. This can not be a function.
   * @typeParam TArgs - A type of parameters tuple required for value evaluation.
   */
  export type Evaluator<TValue, TArgs extends any[] = []> =
  /**
   * @param args - Parameters required for value evaluation.
   *
   * @returns Either an valuated value, or a promise-like instance resolving to one.
   */
      (this: void, ...args: TArgs) => TValue | PromiseLike<TValue>;

}

/**
 * @internal
 */
function isAsyncEvaluator<TValue, TArgs extends any[]>(
    value: AsyncRecipe<TValue, TArgs>,
): value is AsyncRecipe.Evaluator<TValue, TArgs> {
  return typeof value === 'function';
}

/**
 * Asynchronously evaluates a value by its recipe.
 *
 * @typeParam TValue - Evaluated value type. This can not be a function.
 * @typeParam TArgs - A type of parameters tuple required for value evaluation.
 * @param recipe - Asynchronous value evaluation recipe.
 * @param args - Parameters required for value evaluation.
 *
 * @returns A promise resolved to the value.
 */
export async function asyncByRecipe<TValue, TArgs extends any[]>(
    recipe: AsyncRecipe<TValue, TArgs>,
    ...args: TArgs
): Promise<TValue> {
  return (/*#__INLINE__*/ isAsyncEvaluator(recipe)) ? recipe(...args) : recipe;
}

/**
 * Converts asynchronous value recipe to its {@link AsyncRecipe.Evaluator evaluator} function.
 *
 * @typeParam TValue - Evaluated value type. This can not be a function.
 * @typeParam TArgs - A type of parameters tuple required for value evaluation.
 * @param recipe - Asynchronous value recipe to convert.
 *
 * @returns A function asynchronously evaluating the value.
 */
export function asyncRecipe<TValue, TArgs extends any[]>(
    recipe: AsyncRecipe<TValue, TArgs>,
): (this: void, ...args: TArgs) => Promise<TValue> {
  return (/*#__INLINE__*/ isAsyncEvaluator(recipe))
      ? (async (...args) => recipe(...args))
      : () => Promise.resolve(recipe);
}
