/**
 * @packageDocumentation
 * @module @proc7ts/primitives
 */
import { noop } from '../fn';
import type { SupplyPeer } from './supply-peer';

/**
 * Supply handle.
 *
 * Represents a supply of something.
 *
 * The supply can be {@link off cut off}, and can {@link whenOff inform} on cutting off.
 */
export class Supply implements SupplyPeer {

  /**
   * @internal
   */
  private _off: (reason?: unknown) => void;

  /**
   * @internal
   */
  private _whenOff: (callback: (reason?: unknown) => void) => void;

  /**
   * Constructs new supply instance.
   *
   * @param off - A function to call when the supply is {@link Supply.off cut off}. Accepts optional cut off reason
   * as its only parameter. No-op by default.
   */
  constructor(off: (this: void, reason?: unknown) => void = noop) {
    this._off = reason => {
      this._whenOff = callback => callback(reason);
      this._off = noop;
      off(reason);
    };
    this._whenOff = callback => {

      const prev = this._off;

      this._off = reason => {
        prev(reason);
        callback(reason);
      };
    };
  }

  /**
   * `this` supply instance.
   */
  get supply(): this {
    return this;
  }

  /**
   * Whether this supply is {@link off cut off} already.
   *
   * `true` means nothing would be supplied any more.
   */
  get isOff(): boolean {
    return this._off === noop;
  }

  /**
   * Cuts off this supply.
   *
   * After this method call nothing would be supplied any more.
   *
   * Calling this method for the second time has no effect.
   *
   * @param reason - An optional reason why the supply is cut off. It will be reported to {@link whenOff} callbacks.
   * By convenience, an absent reason means the supply is done successfully.
   *
   * @returns The cut off supply instance.
   */
  off(reason?: unknown): Supply {
    this._off(reason);
    return this;
  }

  /**
   * Registers a callback function that will be called as soon as this supply is {@link off cut off}. This callback
   * will be called immediately if {@link isOff} is `true`.
   *
   * @param callback - A callback function accepting optional cut off reason as its only parameter.
   * By convenience an `undefined` reason means the supply is done successfully.
   *
   * @returns `this` instance.
   */
  whenOff(callback: (this: void, reason?: unknown) => void): this {
    this._whenOff(callback);
    return this;
  }

  /**
   * Builds a promise that will be resolved once this supply is {@link off done}.
   *
   * @returns A promise that will be successfully resolved once this supply is cut off without a reason, or rejected
   * once this supply is cut off with any reason except `undefined`.
   */
  whenDone(): Promise<void> {
    return new Promise(
        (resolve, reject) => this.whenOff(
            reason => reason === undefined ? resolve() : reject(reason),
        ),
    );
  }

  /**
   * Makes another supply depend on this one.
   *
   * Once this supply is {@link off cut off}, `another` one will be cut off with the same reason.
   *
   * Calling this method has the same effect as calling {@link needs another.supply.need(this)}.
   *
   * @param another - A supply peer to make dependent on this one.
   *
   * @returns `this` instance.
   */
  cuts(another: SupplyPeer): this {
    another.supply.needs(this);
    return this;
  }

  /**
   * Makes this supply depend on another one.
   *
   * Once `another` supply is {@link off cut off}, this one will be cut off with the same reason.
   *
   * @param another - A supply peer to make this one depend on.
   *
   * @returns `this` instance.
   */
  needs(another: SupplyPeer): this {
    another.supply.whenOff(reason => this.off(reason));
    return this;
  }

}