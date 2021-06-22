import { valueProvider } from './value-providers';

/**
 * Creates a provider of lazily evaluated value.
 *
 * The returned function evaluates the value first time it is called. Then it just returns the previously evaluated one.
 * The failed value evaluation will be retried on the next call.
 *
 * @param provider - A no-arg function evaluating the value.
 *
 * @returns A function that returns the value evaluated by `provider`.
 */
export function lazyValue<T>(provider: (this: void) => T): (this: void) => T {

  let get: () => T;

  const getValue = (): T => {
    get = lazyValue$recurrent; // Prevent recurrent evaluation
    try {

      const value = provider();

      get = valueProvider(value);

      return value;
    } catch (error) {
      get = getValue;
      throw error;
    }
  };

  get = getValue;

  return (): T => get();
}

function lazyValue$recurrent(): never {
  throw new TypeError('Recurrent evaluation');
}
