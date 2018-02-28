import { createFeatureSelector } from "@ngrx/store";

import { IMarketData } from "../../../stockbrokingModule/models";

export const getMarketData = createFeatureSelector<Array<IMarketData>>(
  "stbMarketData"
);
