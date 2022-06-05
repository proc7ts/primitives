/**
 * Arbitrary constructor.
 *
 * @typeParam T - Constructed instance type.
 */
export type Constructor<out T extends object = object> = new(...args: unknown[]) => T;

/**
 * Arbitrary class constructor.
 *
 * @typeParam T - A type of class instance.
 */
export interface Class<out T extends object = object> extends Constructor {

  new(...args: unknown[]): T;

  prototype: T;

}
