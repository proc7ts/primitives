/**
 * Abstract constructor.
 *
 * @typeParam T - Constructed instance type.
 */
export type AbstractConstructor<out T extends object = object> = abstract new (
  ...args: unknown[]
) => T;

/**
 * Abstract class constructor.
 *
 * @typeParam T - A type of class instance.
 */
export interface AbstractClass<out T extends object = object> extends AbstractConstructor<T> {
  prototype: T;
}
