import { StorageSyncEffects } from "ngrx-store-ionic-storage";

import { AuthEffects } from "./auth.effects";
import { SecuritiesEffects } from "./stockbroking/securities.effects";
import { TradeOrderEffects } from "./stockbroking/tradeOrder.effects";
import { MarketDataEffects } from "./stockbroking/marketData.effects";

/**
 * Barrel file used to export functions and constants from the effects folder.
 * Barrel files are used to reduce "import noise" in other files
 */

/**
 * Add all effects into an array of effects, and export this array.
 * This aids the addition of the side effects to our root module without unnecessarily bloating up the module code.
 *
 */
export const allEffects: any[] = [
  StorageSyncEffects,
  AuthEffects,
  SecuritiesEffects,
  TradeOrderEffects,
  MarketDataEffects
];

export * from "./auth.effects";
export * from "./stockbroking/securities.effects";
export * from "./stockbroking/tradeOrder.effects";
export * from "./stockbroking/marketData.effects";
