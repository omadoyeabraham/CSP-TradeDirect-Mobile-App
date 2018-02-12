import * as StbPortfolioActions from "./portfolios.actions";
import { IPortfolio } from "../../../stockbrokingModule/models/portfolio.interface";

describe("STB Portfolios ACTIONS", () => {
  it("should create the savePortfoliosToStore action", () => {
    const portfolios: IPortfolio[] = [];
    const action = new StbPortfolioActions.SaveStbPortfoliosToStore(portfolios);

    expect({ ...action }).toEqual({
      type: StbPortfolioActions.SAVE_STB_PORTFOLIOS_IN_STORE,
      payload: portfolios
    });
  });
});
