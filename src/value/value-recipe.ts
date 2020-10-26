/**
 * @packageDocumentation
 * @module @proc7ts/primitives
 */
import { valueProvider } from './value-providers';

/**
 * A recipe of value evaluation.
 *
 * This is either a value as-is, or its {@link ValueRecipe.Evaluator evaluator} function.
 *
 * @typeParam TValue  Evaluated value type. This can not be a function.
 * @typeParam TArgs  A type of parameters tuple required for value evaluation.
 */
export type ValueRecipe<TValue, TArgs extends any[] = []> =
    | TValue
    | ValueRecipe.Evaluator<TValue, TArgs>;

export namespace ValueRecipe {

  /**
   * Value evaluator signature.
   *
   * @typeParam TValue  Evaluated value type. This can not be a function.
   * @typeParam TArgs  A type of parameters tuple required for value evaluation.
   */
  export type Evaluator<TValue, TArgs extends any[] = []> =
  /**
   * @param args  Parameters required for value evaluation.
   *
   * @returns Evaluated value.
   */
      (this: void, ...args: TArgs) => TValue;

}

/**
 * @internal
 */
function isValueEvaluator<TValue, TArgs extends any[]>(
    value: ValueRecipe<TValue, TArgs>,
): value is ValueRecipe.Evaluator<TValue, TArgs> {
  return typeof value === 'function';
}

/**
 * Evaluates a value by its recipe.
 *
 * @typeParam TValue  Evaluated value type. This can not be a function.
 * @typeParam TArgs  A type of parameters tuple required for value evaluation.
 * @param recipe  Value evaluation recipe.
 * @param args  Parameters required for value evaluation.
 *
 * @returns Either the value itself, or the one evaluated by the given evaluator recipe.
 */
export function valueByRecipe<TValue, TArgs extends any[]>(
    recipe: ValueRecipe<TValue, TArgs>,
    ...args: TArgs
): TValue {
  return (/*#__INLINE__*/ isValueEvaluator(recipe)) ? recipe(...args) : recipe;
}

/**
 * Converts a value recipe to its {@link ValueRecipe.Evaluator evaluator} function.
 *
 * @typeParam TValue  Evaluated value type. This can not be a function.
 * @typeParam TArgs  A type of parameters tuple required for value evaluation.
 * @param recipe  Value recipe to convert.
 *
 * @returns Either evaluator itself, or the one evaluating to the given value.
 */
export function valueRecipe<TValue, TArgs extends any[]>(
    recipe: ValueRecipe<TValue, TArgs>,
): ValueRecipe.Evaluator<TValue, TArgs> {
  return (/*#__INLINE__*/ isValueEvaluator(recipe)) ? recipe : valueProvider(recipe);
}
