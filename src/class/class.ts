/**
 * Arbitrary constructor.
 *
 * @typeParam T - Constructed instance type.
 */
export type Constructor<T = any> = new(...args: any[]) => T;

/**
 * Arbitrary class constructor.
 *
 * @typeParam T - A type of class instance.
 */
export interface Class<T extends object = any> extends Constructor {

  new(...args: any[]): T;

  prototype: T;

}
