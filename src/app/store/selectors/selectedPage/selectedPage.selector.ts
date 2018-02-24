import { createFeatureSelector } from "@ngrx/store";

export const getSelectedPage = createFeatureSelector<object>("selectedPage");
