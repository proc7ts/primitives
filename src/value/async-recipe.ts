/**
 * @packageDocumentation
 * @module @proc7ts/primitives
 */
import { asyncValue } from './async-value';

/**
 * Asynchronous recipe of value evaluation.
 *
 * This is either a value as-is, a promise-like instance resolving to it, or its {@link AsyncRecipe.Evaluator evaluator}
 * function.
 *
 * @typeparam T  Evaluated value type. This can not be a function.
 * @typeparam P  A type of parameters tuple required for value evaluation.
 */
export type AsyncRecipe<T, P extends any[] = []> =
    | T
    | PromiseLike<T>
    | AsyncRecipe.Evaluator<T, P>;

export namespace AsyncRecipe {

  /**
   * Asynchronous value evaluator signature.
   *
   * @typeparam T  Evaluated value type. This can not be a function.
   * @typeparam P  A type of parameters tuple required for value evaluation.
   */
  export type Evaluator<T, P extends any[] = []> =
  /**
   * @param args  Parameters required for value evaluation.
   *
   * @returns Either an valuated value, or a promise-like instance resolving to one.
   */
      (this: void, ...args: P) => T | PromiseLike<T>;

}

/**
 * @internal
 */
function isAsyncEvaluator<T, P extends any[]>(
    value: AsyncRecipe<T, P>,
): value is AsyncRecipe.Evaluator<T, P> {
  return typeof value === 'function';
}

/**
 * Asynchronously evaluates a value by its recipe.
 *
 * @typeparam T  Evaluated value type. This can not be a function.
 * @typeparam P  A type of parameters tuple required for value evaluation.
 * @param recipe  Asynchronous value evaluation recipe.
 * @param args  Parameters required for value evaluation.
 *
 * @returns A promise resolved to the value.
 */
export async function asyncByRecipe<T, P extends any[]>(
    recipe: AsyncRecipe<T, P>,
    ...args: P
): Promise<T> {
  return (/*#__INLINE__*/ isAsyncEvaluator(recipe)) ? recipe(...args) : recipe;
}

/**
 * Converts asynchronous value recipe to its {@link AsyncRecipe.Evaluator evaluator} function.
 *
 * @typeparam T  Evaluated value type. This can not be a function.
 * @typeparam P  A type of parameters tuple required for value evaluation.
 * @param recipe  Asynchronous value recipe to convert.
 *
 * @returns A function asynchronously evaluating the value.
 */
export function asyncRecipe<T, P extends any[]>(
    recipe: AsyncRecipe<T, P>,
): (this: void, ...args: P) => Promise<T> {
  return (/*#__INLINE__*/ isAsyncEvaluator(recipe))
      ? (async (...args) => recipe(...args))
      : () => asyncValue(recipe);
}
