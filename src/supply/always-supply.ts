/**
 * @packageDocumentation
 * @module @proc7ts/primitives
 */
import { Supply } from './supply';
import type { SupplyPeer } from './supply-peer';

/**
 * @internal
 */
class AlwaysSupply extends Supply {

  get isOff(): false {
    return false;
  }

  off(_reason?: unknown): Supply {
    return this;
  }

  whenOff(_callback: (this: void, reason?: unknown) => void): this {
    return this;
  }

  cuts(_another: SupplyPeer): this {
    return this;
  }

  needs(_another: SupplyPeer): this {
    return this;
  }

}

/**
 * @internal
 */
const alwaysSupply$ = (/*#__PURE__*/ new AlwaysSupply());

/**
 * Builds a always-supply instance.
 *
 * The {@link Supply.off} method of returned supply does nothing.
 *
 * @returns A supply instance that can not be cut off.
 */
export function alwaysSupply(): Supply {
  return alwaysSupply$;
}
