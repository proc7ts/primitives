/**
 * Abstract constructor.
 *
 * @typeParam T - Constructed instance type.
 */
export type AbstractConstructor<T = any> = abstract new(...args: any[]) => T;


/**
 * Abstract class constructor.
 *
 * @typeParam T - A type of class instance.
 */
export interface AbstractClass<T extends object = any> extends AbstractConstructor<T> {

  prototype: T;

}
