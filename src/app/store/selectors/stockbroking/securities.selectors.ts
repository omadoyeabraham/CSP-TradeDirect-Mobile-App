import { createFeatureSelector } from "@ngrx/store";

/**
 * Feature selector used to select the "stbSecurities slice of state"
 */
export const getStbSecurities = createFeatureSelector("stbSecurities");
