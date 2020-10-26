/**
 * @packageDocumentation
 * @module @proc7ts/primitives
 */
/**
 * Arbitrary class constructor.
 *
 * @typeParam T  A type of class instance.
 */
export interface Class<T extends object = any> extends Function {

  new(...args: any[]): T;

  prototype: T;

}
