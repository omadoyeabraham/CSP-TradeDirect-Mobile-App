import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ITradeOrderTerm } from "../../../stockbrokingModule/models/tradeOrderTerm.interface";
import { ITradeOrder } from "../../../stockbrokingModule/models";

/**
 * Get the "tradeOrderTerms" slice of state
 */
export const getTradeOrderTerms = createFeatureSelector<Array<ITradeOrderTerm>>(
  "stbTradeOrderTerms"
);

/**
 * Get the trade order terms sorted by lifetime of the term
 */
export const getSortedTradeOrderTerms = createSelector(
  getTradeOrderTerms,
  (state: Array<ITradeOrderTerm>) => {
    return state.sort((a, b) => a.defLifeTime - b.defLifeTime);
  }
);

export const getPreviewedTradeOrder = createFeatureSelector<ITradeOrder>(
  "stbPreviewedTradeOrder"
);
