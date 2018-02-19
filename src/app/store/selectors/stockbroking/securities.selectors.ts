import { createFeatureSelector } from "@ngrx/store";
import { ISecurity } from "../../../stockbrokingModule/models";

/**
 * Feature selector used to select the "stbSecurities slice of state"
 */
export const getStbSecurities = createFeatureSelector<Array<ISecurity>>(
  "stbSecurities"
);

export const getSelectedSecurityOnOverviewPage = createFeatureSelector<
  ISecurity
>("stbSelectedSecurityOnOverviewPage");
