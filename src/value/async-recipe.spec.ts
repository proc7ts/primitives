import { asyncByRecipe, asyncRecipe, AsyncRecipe } from './async-recipe';
import { valueProvider } from './value-providers';

describe('asyncByRecipe', () => {

  let value: string;
  let arg1: number;
  let arg2: string;

  beforeEach(() => {
    value = 'test';
    arg1 = 13;
    arg2 = 'arg2';
  });

  it('retains raw value', async () => {
    expect(await asyncByRecipe(value, arg1, arg2)).toBe(value);
  });
  it('evaluates value', async () => {

    const recipe: AsyncRecipe<string, [number, string]> = jest.fn(() => value);

    expect(await asyncByRecipe(recipe, arg1, arg2)).toBe(value);
    expect(recipe).toHaveBeenCalledWith(arg1, arg2);
  });
});

describe('asyncRecipe', () => {
  it('resolves to recipe value', async () => {

    const recipe: AsyncRecipe.Evaluator<string> = valueProvider('test');

    expect(await asyncRecipe(recipe)()).toBe('test');
  });
  it('converts value to its evaluator', async () => {

    const value = 'test';

    expect(await asyncRecipe(value)()).toBe(value);
  });
});
