import { valueProvider } from './value-providers';

/**
 * Creates a provider of lazily evaluated value.
 *
 * The returned function evaluates the value first time it is called. Then it just returns previously evaluated value.
 *
 * @param provider - A no-arg function evaluating the value.
 *
 * @returns A function that returns the value evaluated by `provider`.
 */
export function lazyValue<T>(provider: (this: void) => T): (this: void) => T {

  let get = (): T => {
    get = lazyValue$recurrent; // Prevent recurrent evaluation

    const value = provider();

    get = valueProvider(value);

    return value;
  };

  return (): T => get();
}

function lazyValue$recurrent(): never {
  throw new TypeError('Recurrent evaluation');
}
